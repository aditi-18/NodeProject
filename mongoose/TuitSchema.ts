// import mongoose,{Schema} from "mongoose";
// const TuitSchema= new mongoose.Schema({

//    tuit: String,
//    postedOn: {type: Date, default: Date.now},
//    postedBy: {type: Schema.Types.ObjectId, ref: "Usermodel"},

// },{collection:'tuits'});
// export default TuitSchema;



import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;



























