
/**
 * @file Server file
 */
 import express, {Request, Response} from 'express';
import UserController from './controller/UserController';
import TuitController from './controller/TuitController';
 import mongoose from "mongoose";
import LikeController from './controller/LikeController';
 
 // connect to the database
 const DB_USERNAME = process.env.DB_USERNAME;
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const connectionString = "mongodb+srv://aditishri:cryptostock@cryptostock.clokm.mongodb.net/trial?retryWrites=true&w=majority";
 mongoose.connect(connectionString);

 mongoose.connection.on("error", function(error) {

    console.log(error)
    
    })
    
    mongoose.connection.on("open", function() {
    
    console.log("Connected to MongoDB database.")
    
    })
 
 // create RESTful Web service API
 const app = express();
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('hello worldddd'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
     
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likeController = LikeController.getInstance(app);
 

 
 const PORT = 3000;
 app.listen(process.env.PORT || PORT);