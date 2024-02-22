package com.example.backend.models;

public class Notification {
    private int idnotifications;
    private int For;
    private int idsubject;
    private int idprofessor;
    private String reason;
    private boolean seen;
    public Notification(int idnotifications, int For, int idsubject, int idprofessor, String reason, boolean seen) {
        this.idnotifications = idnotifications;
        this.For = For;
        this.idsubject = idsubject;
        this.idprofessor = idprofessor;
        this.reason = reason;
        this.seen = seen;
    }
    public int getIdnotifications() {
        return idnotifications;
    }
    public void setIdnotifications(int idnotifications) {
        this.idnotifications = idnotifications;
    }
    public int getFor() {
        return For;
    }
    public void setFor(int for1) {
        For = for1;
    }
    public int getIdsubject() {
        return idsubject;
    }
    public void setIdsubject(int idsubject) {
        this.idsubject = idsubject;
    }
    public int getIdprofessor() {
        return idprofessor;
    }
    public void setIdprofessor(int idprofessor) {
        this.idprofessor = idprofessor;
    }
    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }
    public boolean isSeen() {
        return seen;
    }
    public void setSeen(boolean seen) {
        this.seen = seen;
    }
    
}
