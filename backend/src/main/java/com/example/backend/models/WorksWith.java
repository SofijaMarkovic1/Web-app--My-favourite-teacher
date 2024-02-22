package com.example.backend.models;

public class WorksWith {
    private int idprofessor;
    private int idage;
    public WorksWith(int idprofessor, int idage) {
        this.idprofessor = idprofessor;
        this.idage = idage;
    }
    public int getIdprofessor() {
        return idprofessor;
    }
    public void setIdprofessor(int idprofessor) {
        this.idprofessor = idprofessor;
    }
    public int getIdage() {
        return idage;
    }
    public void setIdage(int idage) {
        this.idage = idage;
    }

    
}
