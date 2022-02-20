// import mongoose,{Schema} from "mongoose";
// const UserSchema = new mongoose.Schema({
//    username: {type: String, required: true},
//    password: {type: String, required: true},
//    firstName:{type: String},
//    lastName: String,
//    email: String,
//    profilePhoto: String,
//    headerImage: String,
//    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
//    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED','DIVORCEE']},
//    biography: String,
//    dateOfBirth: Date,
//    joined: {type: Date, default: Date.now},
//    location: {
//      latitude: {type: Number, default: 0.0},
//      longitude: {type: Number, default: 0.0},
//    }
// }, {collection: 'users'});
// export default UserSchema;

import mongoose from "mongoose";
import User from "../models/User";
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;