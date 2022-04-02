/**
 * @file Like data type to show  relationship 
 * when user likes a tuit
 */
 import Tuit from "./Tuit";
 import User from "./User";
 
 /**
  * @typedef Like Represents  relationship when a user likes a tuit
  * @property {Tuit} tuit Tuit being liked
  * @property {User} likedBy User liking the tuit
  */
 
 export default interface Like {
     tuit: Tuit,
     likedBy: User
 };