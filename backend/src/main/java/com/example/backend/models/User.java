package com.example.backend.models;

public class User {
    private int userid;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String adress;
    private String contact;
    private String safetyQuestion;
    private String safetyAnswer;
    private int gender;
    private int type; // 1 - student, 2 - professor
    private String username;
    private byte[] image;
    public User(int userid, String email, String password, String name, String surname, String adress, String contact,
            String safetyQuestion, String safetyAnswer, int gender, String username, byte[] image) {
        this.userid = userid;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.adress = adress;
        this.contact = contact;
        this.safetyQuestion = safetyQuestion;
        this.safetyAnswer = safetyAnswer;
        this.gender = gender;
        this.username = username;
        this.image = image;
    }
    public int getUserid() {
        return userid;
    }
    public void setUserid(int userid) {
        this.userid = userid;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getAdress() {
        return adress;
    }
    public void setAdress(String adress) {
        this.adress = adress;
    }
    public String getContact() {
        return contact;
    }
    public void setContact(String contact) {
        this.contact = contact;
    }
    public String getSafetyQuestion() {
        return safetyQuestion;
    }
    public void setSafetyQuestion(String safetyQuestion) {
        this.safetyQuestion = safetyQuestion;
    }
    public String getSafetyAnswer() {
        return safetyAnswer;
    }
    public void setSafetyAnswer(String safetyAnswer) {
        this.safetyAnswer = safetyAnswer;
    }
    public int getGender() {
        return gender;
    }
    public void setGender(int gender) {
        this.gender = gender;
    }
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }
    
}
