package com.example.backend.models;

public class Professor extends User{
    private String aboutSite;
    private boolean accepted;
    public Professor(int userid, String email, String password, String name, String surname, String adress,
            String contact, String safetyQuestion, String safetyAnswer, int gender, String username, String aboutSite, byte[] image, boolean accepted) {
        super(userid, email, password, name, surname, adress, contact, safetyQuestion, safetyAnswer, gender, username, image);
        //TODO Auto-generated constructor stub
        
        this.aboutSite = aboutSite;
        this.accepted = accepted;
    }
    public String getAboutSite() {
        return aboutSite;
    }
    public void setAboutSite(String aboutSite) {
        this.aboutSite = aboutSite;
    }
    public boolean isAccepted() {
        return accepted;
    }
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
    
    
    
}
