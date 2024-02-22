package com.example.backend.models;

public class Age {
    private int idage;
    private String age;
    public Age(int idage, String age) {
        this.idage = idage;
        this.age = age;
    }
    public int getIdage() {
        return idage;
    }
    public void setIdage(int idage) {
        this.idage = idage;
    }
    public String getAge() {
        return age;
    }
    public void setAge(String age) {
        this.age = age;
    }
    
}
