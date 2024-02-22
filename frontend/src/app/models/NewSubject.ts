export class NewSubject {
    idnewsubject: number;
    name: string;
    idprofessor: number;
  
    constructor(idnewsubject: number, name: string, idprofessor: number) {
      this.idnewsubject = idnewsubject;
      this.name = name;
      this.idprofessor = idprofessor;
    }
  
    getIdnewsubject(): number {
      return this.idnewsubject;
    }
  
    setIdnewsubject(idnewsubject: number): void {
      this.idnewsubject = idnewsubject;
    }
  
    getName(): string {
      return this.name;
    }
  
    setName(name: string): void {
      this.name = name;
    }
  
    getIdprofessor(): number {
      return this.idprofessor;
    }
  
    setIdprofessor(idprofessor: number): void {
      this.idprofessor = idprofessor;
    }
  }