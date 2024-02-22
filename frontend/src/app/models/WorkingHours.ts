

export class WorkingHours{
    idworkinghours:number;
    idprofessor:number;
    date:string;
    startTime:string;
    endTime:string;

    constructor(id:number, idP:number, d:string, s:string, e:string){
        this.idworkinghours = id;
        this.idprofessor = idP;
        this.date = d;
        this.startTime = s;
        this.endTime = e;
    }
}