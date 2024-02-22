package com.example.backend.models;


public class WorkingHours {
    private int idworkinghours;
    private int idprofessor;
    private String date;
    private String startTime;
    private String endTime;
    public WorkingHours(int idworkinghours, int idprofessor, String date, String startTime, String endTime) {
        this.idworkinghours = idworkinghours;
        this.idprofessor = idprofessor;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public int getIdworkinghours() {
        return idworkinghours;
    }
    public void setIdworkinghours(int idworkinghours) {
        this.idworkinghours = idworkinghours;
    }
    public int getIdprofessor() {
        return idprofessor;
    }
    public void setIdprofessor(int idprofessor) {
        this.idprofessor = idprofessor;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getStartTime() {
        return startTime;
    }
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    public String getEndTime() {
        return endTime;
    }
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    
}
