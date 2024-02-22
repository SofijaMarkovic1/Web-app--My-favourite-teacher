package com.example.backend.models;

public class CV {
    private int idprofessor;
    private byte[] cv;
    public CV(int idprofessor, byte[] cv) {
        this.idprofessor = idprofessor;
        this.cv = cv;
    }
    public int getIdprofessor() {
        return idprofessor;
    }
    public void setIdprofessor(int idprofessor) {
        this.idprofessor = idprofessor;
    }
    public byte[] getCv() {
        return cv;
    }
    public void setCv(byte[] cv) {
        this.cv = cv;
    }
    
}
