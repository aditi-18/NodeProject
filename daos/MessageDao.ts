import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDaoI from "../interfaces/MessageDaoI";

export default class MessageDao implements MessageDaoI{
    private static msgDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.msgDao === null) {
            MessageDao.msgDao = new MessageDao();
        }
        return MessageDao.msgDao;
    }
    private constructor() {}

    findAllMessages = async (): Promise<Message[]> =>
    MessageModel.find();

    findAllMessageSentToUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({to: uid});

    findallMessageReceivedByUser = async (uid: string): Promise<Message[]> =>
MessageModel.find({from: uid});

deleteMessageSent = async (mid: string): Promise<any> =>
    MessageModel.deleteOne({_id: mid});

sendMessage = async (uid: string, msg: Message): Promise<any> =>
    MessageModel.updateOne(
        {_id: uid},
        {$set: msg});

    }


