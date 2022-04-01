/**
 * @file  Dislike data type representing relationship whenn
 as in user dislikes a tuit
 */
 import Tuit from "./Tuit";
 import User from "./User";
 
 /**
  * @typedef Like Represents dislikes relationship between when a user dislikes a tuit
  * @property {Tuit} tuit Tuit being liked
  * @property {User} disLikedBy User disliking the tuit
  */
 
 export default interface Dislike {
     tuit: Tuit,
     dislikedBy: User
 };