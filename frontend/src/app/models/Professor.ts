import { User } from "./User";

export class Professor extends User{
    aboutSite:string;
    accepted:boolean;

    constructor(userid:number, email:string, password:string, name:string, surname:string, adress:string, contact:string, safetyQuestion:string, safetyAnswer:string, gender:number, type:number, aboutSite:string, username:string, image:string, accepted:boolean){
        super(userid, email, password, name, surname, adress, contact, safetyQuestion, safetyAnswer, gender, type, username, image);
        this.aboutSite = aboutSite;
        this.accepted = accepted;
    }
    
}