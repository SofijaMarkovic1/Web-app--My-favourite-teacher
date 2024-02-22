export class PastClass{
    idpastclass: number;
    idstudent: number;
    idprofessor: number;
    idsubject: number;
    dateAndTimeStart: string;
    dateAndTimeEnd: string;
    professorComment: string;
    studentComment: string;
    studentGrade: number;
    professorGrade:number;

    constructor(
        idpastclass: number,
        idstudent: number,
        idprofessor: number,
        idsubject: number,
        dateAndTimeStart: string,
        dateAndTimeEnd: string,
        professorComment: string,
        studentComment: string,
        studentGrade: number,
        professorGrade: number
    ) {
        this.idpastclass = idpastclass;
        this.idstudent = idstudent;
        this.idprofessor = idprofessor;
        this.idsubject = idsubject;
        this.dateAndTimeStart = dateAndTimeStart;
        this.dateAndTimeEnd = dateAndTimeEnd;
        this.professorComment = professorComment;
        this.studentComment = studentComment;
        this.studentGrade = studentGrade;
        this.professorGrade = professorGrade;
    }
}