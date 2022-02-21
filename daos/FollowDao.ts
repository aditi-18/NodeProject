import Follows from "../models/Follows";
import FollowDaoI from "../interfaces/FollowsDaoI";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowModel from "../mongoose/FollowModel";
import User from "../models/User";

export default class FollowDao implements FollowDaoI{


private static followdao:FollowDao|null=null;

public static getInstance=():FollowDao=>{
    if(FollowDao.followdao==null){
        FollowDao.followdao= new FollowDao();
    }
    return FollowDao.followdao;
}
private constructor(){}

followUser=async():Promise<User[]>=>
 FollowModel.find();

findAllFollowedUser= async (uid: string): Promise<User[]> =>
FollowModel.find({followedBy: uid});

findallFollowing= async (uid: string): Promise<User[]> =>
FollowModel.find({following: uid});

deletefollower = async (uid: string): Promise<any> =>
FollowModel.deleteOne({_id: uid});

follow = async (uid: string, user: User): Promise<any> =>
    FollowModel.updateOne(
        {_id: uid},
        {$set: user});

}
