export class User{
    userid:number;
    email:string;
    password:string;
    name:string;
    surname:string;
    adress:string;
    contact:string;
    safetyQuestion:string;
    safetyAnswer:string;
    gender:number;
    type:number; // 1 - student, 2 - professor
    username:string;
    image:string;

    constructor(userid:number, email:string, password:string, name:string, surname:string, adress:string, contact:string, safetyQuestion:string, safetyAnswer:string, gender:number, type:number, username:string, image:string){
        this.userid = userid;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.adress = adress;
        this.contact = contact;
        this.safetyQuestion = safetyQuestion;
        this.safetyAnswer = safetyAnswer;
        this.gender = gender;
        this.type = type;
        this.username = username;
        this.image = image;
    }
}