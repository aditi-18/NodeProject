// import User from "./User";
// //import { Module } from 'module';
// import * as Module from 'module';

// export  default interface Tuit {
//     tuit: string,
//     postedBy: User,
//     postedOn?: Date,
// };

import User from "./User";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};