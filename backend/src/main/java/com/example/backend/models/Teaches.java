package com.example.backend.models;

public class Teaches {
    private int idprofessor;
    private int idsubject;
    public Teaches(int idprofessor, int idsubject) {
        this.idprofessor = idprofessor;
        this.idsubject = idsubject;
    }
    public int getIdprofessor() {
        return idprofessor;
    }
    public void setIdprofessor(int idprofessor) {
        this.idprofessor = idprofessor;
    }
    public int getIdsubject() {
        return idsubject;
    }
    public void setIdsubject(int idsubject) {
        this.idsubject = idsubject;
    }
    
}
