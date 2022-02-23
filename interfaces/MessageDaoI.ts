import Message from "../models/Message";

/**
 * @file Declares API for Message related data access object methods
 */
export default interface MessageDaoI{

findAllMessageSentToUser(uid:string):Promise<Message[]>;
findallMessageReceivedByUser(uid:string):Promise<Message[]>;
deleteMessageSent(mid:string):Promise<any>;
sendMessage(uid1:string,uid2:string,message:Message):Promise<Message>;
}