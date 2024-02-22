package com.example.backend.models;

public class Subject {
    private int idsubject;
    private String name;
    public Subject(int idsubject, String name) {
        this.idsubject = idsubject;
        this.name = name;
    }
    public int getIdsubject() {
        return idsubject;
    }
    public void setIdsubject(int idsubject) {
        this.idsubject = idsubject;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    

}
