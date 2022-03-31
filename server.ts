 import express, {Request, Response} from 'express';
 //import CourseController from "./controllers/CourseController";
 import UserController from "./controller/UserController";
 import TuitController from "./controller/TuitController";
 import LikeController from "./controller/LikeController";
 //import BookMarkController from "./controller/BookMarkController"
import FollowController from './controller/FollowController';
// import MessageController from './controller/MessageController';
 import mongoose from "mongoose";
import AuthenticationController from './controller/auth-controller';
// import GroupController from "./controllers/GroupController";
 const cors = require("cors");
 const session = require("express-session");
 
 // build the connection string
 const PROTOCOL = "mongodb+srv";
 const DB_USERNAME = process.env.DB_USERNAME;
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const HOST = "cluster0.m8jeh.mongodb.net";
 const DB_NAME = "myFirstDatabase";
 const DB_QUERY = "retryWrites=true&w=majority";
 // const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;// connect to the database
 const connectionString = "mongodb+srv://aditishri:cryptostock@cryptostock.clokm.mongodb.net/trial?retryWrites=true&w=majority";
 
 const app = express();
 app.use(cors({
    credentials: true,
    origin: ['https://localhost:3000','https://preeminent-axolotl-9218d0.netlify.app']
}));

 mongoose.connect(connectionString);

 const SECRET = 'process.env.SECRET';
 let sess = {

     secret: SECRET,
     saveUninitialized: true,
     resave: true,
     cookie: {
         secure: false
     }
 }
 
 if (process.env.ENVIRONMENT === 'DEV') {
     app.set('trust proxy', 1) // trust first proxy
     sess.cookie.secure = true // serve secure cookies
 }
 
 app.use(session(sess))
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 
 // create RESTful Web service API
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likesController = LikeController.getInstance(app);
 //const bookmarkController = BookMarkController.getInstance(app);
const followController = FollowController.getInstance(app);
// const messageController = MessageController.getInstance(app);
 AuthenticationController(app);
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);