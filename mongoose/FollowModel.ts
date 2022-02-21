/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
 import mongoose from "mongoose";
 import FollowSchema from "./FollowSchema";
 const FollowModel = mongoose.model("FollowModel", FollowSchema);
 export default FollowModel;