import AccountType from "./AccountType";
import MaritialStatus from "./MaritialStatus";
import Location from "./Location";

export default class user{
    private username:string='';
    private password:any;
    private firstName:string='';
    private lastName:string='';
    private email:string='';
    private phoneNumber:number|null=null;
    private profilePhoto:string|null=null;
    private headerImage:string|null=null;
    private accountType:AccountType=AccountType.Academic;
    private maritialStatus:MaritialStatus=MaritialStatus.Single;
    private biography:string|null=null;
    private interests:string|null=null;
    private dob:Date|null=null;
    private joined:Date=new Date();
    private location:Location|null=null;

}