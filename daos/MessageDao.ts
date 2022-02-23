/**
* @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
* to integrate with MongoDB
*/
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDaoI from "../interfaces/MessageDaoI";


/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of msgdao.
 * @property {MessageDao} MessageDao Private single instance of messageDao.
 */
export default class MessageDao implements MessageDaoI {
    private static msgDao: MessageDao | null = null;

    /**
    * Creates singleton DAO instance
    * @returns MessageDao.
    */
    public static getInstance = (): MessageDao => {
        if (MessageDao.msgDao === null) {
            MessageDao.msgDao = new MessageDao();
        }
        return MessageDao.msgDao;
    }
    private constructor() { }

    /**
    * Uses MessageModel to retrieve all msgs that is sent to a  user.
    * @param {string} uid is primary key of user.
    * @returns Promise To be notified when the msgs are retrieved from
    * database using the uid.
    */
    findAllMessageSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ to: uid });

    /**
    * Uses MessageModel to retrieve all msgs that is received by a  user.
    * @param {string} uid is primary key of user.
    * @returns Promise To be notified when the msgs are retrieved from
    * database using the uid.
    */
    findallMessageReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ from: uid });

    /**
    * Deletes  msg instance from the database
    * @param {string} mid is primary key of msg.
    * @returns Promise To be notified when msg is deleted from the database.
    */

    deleteMessageSent = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid });

    /**
    * Sends msg instance into the database
    * @param {string} uid1 is primary key of user1.
    * @param {string} uid2 is primary key of user2.
    * @returns Promise To be notified when msg is sent to user.
    */
    sendMessage = async (uid1: string, uid2: string, msg: Message): Promise<any> =>
        MessageModel.create(
            { ...msg, to: uid1, from: uid2 });

}


