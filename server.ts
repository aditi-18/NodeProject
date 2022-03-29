
// /**
//  * @file Server file
//  */
//  import express, {Request, Response} from 'express';
// import UserController from './controller/UserController';
// import TuitController from './controller/TuitController';
//  import mongoose from "mongoose";
// import LikeController from './controller/LikeController';
// import FollowController from './controller/FollowController';
// import MessageController from './controller/MessageController';
// import BookmarkController from './controller/BookmarkController';
 
// var cors = require('cors')
//  // connect to the database
//  const DB_USERNAME = process.env.DB_USERNAME;
//  const DB_PASSWORD = process.env.DB_PASSWORD;
//  const connectionString = "mongodb+srv://aditishri:cryptostock@cryptostock.clokm.mongodb.net/trial?retryWrites=true&w=majority";
//  mongoose.connect(connectionString);

//  mongoose.connection.on("error", function(error) {

//     console.log(error)
    
//     })
    
//     mongoose.connection.on("open", function() {
    
//     console.log("Connected to MongoDB database.")
    
//     })
 
//  // create RESTful Web service API
//  const app = express();
//  app.use(express.json());
//  app.use(cors());
 
//  app.get('/', (req: Request, res: Response) =>
//      res.send('hello worldddd'));
 
//  app.get('/add/:a/:b', (req: Request, res: Response) =>
//      res.send(req.params.a + req.params.b));
     
//  const userController = UserController.getInstance(app);
//  const tuitController = TuitController.getInstance(app);
//  const likeController = LikeController.getInstance(app);
//  const followController = FollowController.getInstance(app);
//  const msgcontroller = MessageController.getInstance(app);
//  const bookmarkController=BookmarkController.getInstance(app);

//  const PORT = 3000;
//  app.listen(process.env.PORT || PORT);

/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
 import express, {Request, Response} from 'express';
 //import CourseController from "./controllers/CourseController";
 import UserController from "./controller/UserController";
 import TuitController from "./controller/TuitController";
 import LikeController from "./controller/LikeController";
 import mongoose from "mongoose";
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
 mongoose.connect(connectionString);
 
 const app = express();
 app.use(cors({
     credentials: true,
     origin: 'https://sad-ride-0c5758.netlify.app/'
 }));
 
 const SECRET = 'process.env.SECRET';
 let sess = {
     secret: SECRET,
     saveUninitialized: true,
     resave: true,
     cookie: {
         secure: false
     }
 }
 
 if (process.env.ENVIRONMENT === 'PRODUCTION') {
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
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);