export class Notification {
    idnotifications: number;
    For: number;
    idsubject: number;
    idprofessor: number;
    reason: string;
    seen: boolean;
  
    constructor(idnotifications: number, For: number, idsubject: number, idprofessor: number, reason: string, seen: boolean) {
      this.idnotifications = idnotifications;
      this.For = For;
      this.idsubject = idsubject;
      this.idprofessor = idprofessor;
      this.reason = reason;
      this.seen = seen;
    }
  }