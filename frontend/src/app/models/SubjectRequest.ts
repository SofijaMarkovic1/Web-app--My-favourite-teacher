export class SubjectRequest{
    idnewsubject:number;
    name:string;
    idprofessor:number;
    constructor(ids:number, name:string, idp:number){
        this.idnewsubject = ids;
        this.name = name;
        this.idprofessor = idp;
    }
}