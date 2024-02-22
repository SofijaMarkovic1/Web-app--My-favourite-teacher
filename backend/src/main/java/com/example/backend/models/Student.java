package com.example.backend.models;

public class Student extends User{
    private int schoolType;
    private int grade;
    public Student(int userid, String email, String password, String name, String surname, String adress,
            String contact, String safetyQuestion, String safetyAnswer, int gender, String username, int schoolType, int grade, byte[] image) {
        super(userid, email, password, name, surname, adress, contact, safetyQuestion, safetyAnswer, gender, username, image);
        //TODO Auto-generated constructor stub
        this.schoolType = schoolType;
        this.grade = grade;
    }
    public int getSchoolType() {
        return schoolType;
    }
    public void setSchoolType(int schoolType) {
        this.schoolType = schoolType;
    }
    public int getGrade() {
        return grade;
    }
    public void setGrade(int grade) {
        this.grade = grade;
    }
    
    
}
