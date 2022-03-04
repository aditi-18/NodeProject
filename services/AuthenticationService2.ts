import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "aditishri";
const DB_PASSWORD ="cryptostock";
const HOST = "cryptostock.clokm.mongodb.net";
const DB_NAME = "trial";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `mongodb+srv://aditishri:cryptostock@cryptostock.clokm.mongodb.net/trial?retryWrites=true&w=majority`;
// connect to the database
mongoose.connect(connectionString);


export const login = async (u: string, p: string) => {
  try {
    const user = await userDao.findUserByCredentials(u, p);
    if (!user) {
      throw "Unknown user";
    }
    return user;
  } catch (e) {
    return e;
  }
}

export const register = async (u: string, p: string, e: string) => {
  try {
    const user = await userDao.findUserByUsername(u);
    if (user) {
      throw 'User already exists';
    }
    const newUser = await userDao.createUser({username: u, password: p, email: e});
    return newUser;
  } catch (e) {
    return e;
  }
}

export const initializeSalaries = async (salary: number) => {
  const users = await userDao.findAllUsers()
  const salaryPromises = users.map(user =>
    userDao.updateUserSalaryByUsername(user.username, salary));
  const values = await Promise.all(salaryPromises);
  return values;
}

register('alice678', 'alice234', 'alice234@gmail.com')

login('alice678', 'alice234')
// login('alice', 'alice123')

// userDao.findAllUsers()
//     .then(users => console.log(users));