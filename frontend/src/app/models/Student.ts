import { User } from "./User";

export class Student extends User{
    schoolType:number;
    grade:number;

    constructor(userid:number, email:string, password:string, name:string, surname:string, adress:string, contact:string, safetyQuestion:string, safetyAnswer:string, gender:number, type:number, schoolType:number, grade:number, username:string, image:string){
        super(userid, email, password, name, surname, adress, contact, safetyQuestion, safetyAnswer, gender, type, username, image);
        this.schoolType = schoolType;
        this.grade = grade;
    }
    
}