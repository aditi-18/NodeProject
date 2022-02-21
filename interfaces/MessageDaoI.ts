import Message from "../models/Message";

export default interface MessageDaoI{

findAllMessages (): Promise<Message[]>;
findAllMessageSentToUser(uid:string):Promise<Message[]>;
findallMessageReceivedByUser(uid:string):Promise<Message[]>;
deleteMessageSent(mid:string):Promise<any>;
sendMessage(uid:string,message:Message):Promise<Message>;
}