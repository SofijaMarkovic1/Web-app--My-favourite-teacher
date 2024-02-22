package com.example.backend.models;

public class PastClass {
    private int idpastclass;
    private int idstudent;
    private int idprofessor;
    private int idsubject;
    private String dateAndTimeStart;
    private String dateAndTimeEnd;
    private String professorComment;
    private String studentComment;
    private int studentGrade;
    private int professorGrade;
    public PastClass(int idpastclass, int idstudent, int idprofessor, int idsubject, String dateAndTimeStart,
            String dateAndTimeEnd, String professorComment, String studentComment, int studentGrade, int professorGrade) {
        this.idpastclass = idpastclass;
        this.idstudent = idstudent;
        this.idprofessor = idprofessor;
        this.idsubject = idsubject;
        this.dateAndTimeStart = dateAndTimeStart;
        this.dateAndTimeEnd = dateAndTimeEnd;
        this.professorComment = professorComment;
        this.studentComment = studentComment;
        this.studentGrade = studentGrade;
        this.professorGrade = professorGrade;
    }
    public int getIdpastclass() {
        return idpastclass;
    }
    public void setIdpastclass(int idpastclass) {
        this.idpastclass = idpastclass;
    }
    public int getIdstudent() {
        return idstudent;
    }
    public void setIdstudent(int idstudent) {
        this.idstudent = idstudent;
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
    public String getProfessorComment() {
        return professorComment;
    }
    public void setProfessorComment(String professorComment) {
        this.professorComment = professorComment;
    }
    public String getStudentComment() {
        return studentComment;
    }
    public void setStudentComment(String studentComment) {
        this.studentComment = studentComment;
    }
    public int getStudentGrade() {
        return studentGrade;
    }
    public void setStudentGrade(int studentGrade) {
        this.studentGrade = studentGrade;
    }
    public int getProfessorGrade() {
        return professorGrade;
    }
    public void setProfessorGrade(int professorGrade) {
        this.professorGrade = professorGrade;
    }
    
}
