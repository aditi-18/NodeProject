// import AccountType from "./AccountType";
// import MaritialStatus from "./MaritialStatus";
// import Location from "./Location"; 
// export default class User{
//     private username:string='';
//     private password:any;
//     private firstName:string|null=null;
//     private lastName:string|null=null;
//     private email:string='';
//     private phoneNumber:number|null=null;
//     private profilePhoto:string|null=null;
//     private headerImage:string|null=null;
//     private accountType:AccountType=AccountType.Academic;
//     private maritialStatus:MaritialStatus=MaritialStatus.Single;
//     private biography:string|null=null;
//     private interests:string|null=null;
//     private dob:Date|null=null;
//     private joined:Date=new Date();
//     private location:Location|null=null; 
// }

import AccountType from "./AccountType";
import MaritialStatus from "./MaritialStatus";
import Location from "./Location";
import mongoose from "mongoose";

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritialStatus,
    location?: Location,
    salary?: number
};