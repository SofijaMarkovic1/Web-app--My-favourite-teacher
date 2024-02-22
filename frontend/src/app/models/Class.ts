export class Class{
    idclass:number;
    idprofessor:number;
    idsubject:number;
    idstudent:number;
    dateAndTimeStart:string;
    dateAndTimeEnd:string;
    groupClass:boolean;
    topic:string;
    codeForGroupClass:string=null;

    constructor(idclass:number, idprofessor:number, idsubject:number, idstudent:number, dateAndTimeStart:string, dateAndTimeEnd:string, groupClass:boolean, topic:string){
        this.idclass = idclass;
        this.idprofessor = idprofessor;
        this.idsubject = idsubject;
        this.idstudent = idstudent;
        this.dateAndTimeStart = dateAndTimeStart;
        this.dateAndTimeEnd = dateAndTimeEnd;
        this.groupClass = groupClass;
        this.topic = topic;
    }
}