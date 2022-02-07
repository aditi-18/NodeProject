import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: String,
   lastName: String,
   email: String,
   profilePhoto: String,
   headerImage: String,
   accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
   maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED','DIVORCEE']},
   biography: String,
   dateOfBirth: Date,
   joined: {type: Date, default: Date.now},
   location: {
     latitude: {type: Number, default: 0.0},
     longitude: {type: Number, default: 0.0},
     left:'LEFT',
     right:'RIGHT',
    center:'CENTER',
     north: 'N',
    south: 'S',
     east: 'E',
      west: 'W',
     northEast: 'NE',
      northWest:'NW',
     southEast:'SE',
     southWest:'SW'
     
   }
}, {collection: 'users'});
export default UserSchema;

