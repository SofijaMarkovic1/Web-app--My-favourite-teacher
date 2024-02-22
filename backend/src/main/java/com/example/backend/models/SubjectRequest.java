package com.example.backend.models;

public class SubjectRequest {
    private int idnewsubject;
    private String name;
    private int idprofessor;
    public SubjectRequest(int idnewsubject, String name, int idprofessor) {
        this.idnewsubject = idnewsubject;
        this.name = name;
        this.idprofessor = idprofessor;
    }
    public int getIdnewsubject() {
        return idnewsubject;
    }
    public void setIdnewsubject(int idnewsubject) {
        this.idnewsubject = idnewsubject;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getIdprofessor() {
        return idprofessor;
    }
    public void setIdprofessor(int idprofessor) {
        this.idprofessor = idprofessor;
    }

    
}
