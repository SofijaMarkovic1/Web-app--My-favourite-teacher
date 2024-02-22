package com.example.backend.models;


public class Class {
    private int idclass;
    private int idprofessor;
    private int idsubject;
    private int idstudent;
    private String dateAndTimeStart;
    private String dateAndTimeEnd;
    private boolean groupClass;
    private String topic;
    private String codeForGroupClass=null;
    public Class(int idclass, int idprofessor, int idsubject, int idstudent, String dateAndTimeStart,
            String dateAndTimeEnd, boolean groupClass, String topic) {
        this.idclass = idclass;
        this.idprofessor = idprofessor;
        this.idsubject = idsubject;
        this.idstudent = idstudent;
        this.dateAndTimeStart = dateAndTimeStart;
        this.dateAndTimeEnd = dateAndTimeEnd;
        this.groupClass = groupClass;
        this.topic = topic;
    }
    public int getIdclass() {
        return idclass;
    }
    public void setIdclass(int idclass) {
        this.idclass = idclass;
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
    public int getIdstudent() {
        return idstudent;
    }
    public void setIdstudent(int idstudent) {
        this.idstudent = idstudent;
    }
    public String getDateAndTimeStart() {
        return dateAndTimeStart;
    }
    public void setDateAndTimeStart(String dateAndTimeStart) {
        this.dateAndTimeStart = dateAndTimeStart;
    }
    public String getDateAndTimeEnd() {
        return dateAndTimeEnd;
    }
    public void setDateAndTimeEnd(String dateAndTimeEnd) {
        this.dateAndTimeEnd = dateAndTimeEnd;
    }
    public boolean isGroupClass() {
        return groupClass;
    }
    public void setGroupClass(boolean groupClass) {
        this.groupClass = groupClass;
    }
    public String getTopic() {
        return topic;
    }
    public void setTopic(String topic) {
        this.topic = topic;
    }
    public String getCodeForGroupClass() {
        return codeForGroupClass;
    }
    public void setCodeForGroupClass(String codeForGroupClass) {
        this.codeForGroupClass = codeForGroupClass;
    }
    
    
}
