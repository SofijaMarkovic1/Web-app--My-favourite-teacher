package com.example.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.DB;
import com.example.backend.models.CV;
import com.example.backend.models.Professor;
import com.example.backend.models.Student;
import com.example.backend.models.User;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.hashing.PasswordHashing;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/userRegistration")
@RestController
public class RegistrationController {
    

    @PostMapping("/student")
    public int postMethodName(@RequestBody Student s) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where username=?");
            stmt.setString(1, s.getUsername());
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                return -1;
            }
            PreparedStatement stmt1 = conn.prepareStatement("Select * from user where email=?");
            stmt1.setString(1, s.getEmail());
            ResultSet rs1 = stmt1.executeQuery();
            if(rs1.next()){
                return -2;
            }
            PreparedStatement stmt6 = conn.prepareStatement("Select * from forbidenusername where username=?");
            stmt6.setString(1, s.getUsername());
            ResultSet rs3 = stmt6.executeQuery();
            if(rs3.next()){
                return -4;
            }
            PreparedStatement stmt7 = conn.prepareStatement("Select * from forbidenemails where email=?");
            stmt7.setString(1, s.getEmail());
            ResultSet rs4 = stmt7.executeQuery();
            if(rs4.next()){
                return -5;
            }
            PreparedStatement stmt2 = conn.prepareStatement("Insert into user(email, password, name, surname, adress, contact, safetyQuestion, safetyAnswer, gender, username) values (?,?,?,?,?,?,?,?,?,?)");
            String hashed = PasswordHashing.hashPassword(s.getPassword());
            if(hashed==null) return -3;
            stmt2.setString(1, s.getEmail());
            stmt2.setString(2, hashed);
            stmt2.setString(3, s.getName());
            stmt2.setString(4, s.getSurname());
            stmt2.setString(5, s.getAdress());
            stmt2.setString(6, s.getContact());
            stmt2.setString(7, s.getSafetyQuestion());
            stmt2.setString(8, s.getSafetyAnswer());
            stmt2.setInt(9, s.getGender());
            stmt2.setString(10, s.getUsername());
            if(stmt2.executeUpdate()>0){
                PreparedStatement stmt3 = conn.prepareStatement("Select iduser from user where username=?");
                stmt3.setString(1, s.getUsername());
                ResultSet rs2 = stmt3.executeQuery();
                if(rs2.next()){
                    int id = rs2.getInt("iduser");
                    PreparedStatement stmt4 = conn.prepareStatement("Insert into student values(?,?,?)");
                    stmt4.setInt(1, id);
                    stmt4.setInt(2, s.getSchoolType());
                    stmt4.setInt(3, s.getGrade());
                    if(stmt4.executeUpdate()>0) {
                        PreparedStatement stmt5 = conn.prepareStatement("Insert into profileimage values(?,?)");
                        stmt5.setInt(1, id);
                        stmt5.setBytes(2, s.getImage());
                        if(stmt5.executeUpdate()>0) return 0;
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return -3;
    }

    @PostMapping("/user")
    public int postMethodName(@RequestBody User s){
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where username=?");
            stmt.setString(1, s.getUsername());
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                return -1;
            }
            PreparedStatement stmt1 = conn.prepareStatement("Select * from user where email=?");
            stmt1.setString(1, s.getEmail());
            ResultSet rs1 = stmt1.executeQuery();
            if(rs1.next()){
                return -2;
            }
            PreparedStatement stmt4 = conn.prepareStatement("Select * from forbidenusername where username=?");
            stmt4.setString(1, s.getUsername());
            ResultSet rs3 = stmt4.executeQuery();
            if(rs3.next()){
                return -4;
            }
            PreparedStatement stmt5 = conn.prepareStatement("Select * from forbidenemails where email=?");
            stmt5.setString(1, s.getEmail());
            ResultSet rs4 = stmt5.executeQuery();
            if(rs4.next()){
                return -5;
            }
            PreparedStatement stmt2 = conn.prepareStatement("Insert into user(email, password, name, surname, adress, contact, safetyQuestion, safetyAnswer, gender, username) values (?,?,?,?,?,?,?,?,?,?)");
            String hashed = PasswordHashing.hashPassword(s.getPassword());
            if(hashed==null) return -3;
            stmt2.setString(1, s.getEmail());
            stmt2.setString(2, hashed);
            stmt2.setString(3, s.getName());
            stmt2.setString(4, s.getSurname());
            stmt2.setString(5, s.getAdress());
            stmt2.setString(6, s.getContact());
            stmt2.setString(7, s.getSafetyQuestion());
            stmt2.setString(8, s.getSafetyAnswer());
            stmt2.setInt(9, s.getGender());
            stmt2.setString(10, s.getUsername());
            if(stmt2.executeUpdate()>0){
                PreparedStatement stmt3 = conn.prepareStatement("Select max(iduser) from user");
                rs = stmt3.executeQuery();
                if(rs.next()){
                    return rs.getInt("max(iduser)");
                }
            }

        }catch(Exception e){
            e.printStackTrace();
        }
        return -3;
    }

    @PostMapping("/professor")
    public int postMethodName(@RequestBody Professor p){
        try{
            System.out.println(p.getUserid());
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Insert into professor(idprofessor, aboutSite) values(?,?)");
            stmt.setInt(1, p.getUserid());
            stmt.setString(2, p.getAboutSite());
            if(stmt.executeUpdate()>0) {
                PreparedStatement stmt1 = conn.prepareStatement("Insert into profileimage values(?,?)");
                stmt1.setInt(1, p.getUserid());
                System.out.println(p.getImage());
                stmt1.setBytes(2, p.getImage());
                if(stmt1.executeUpdate()>0) return 0;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return -1;
    }

    @PostMapping("/acceptProfessor")
    public void postMethodName1(@RequestBody Professor p) {
        //TODO: process POST request
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Update professor set accepted=1 where idprofessor=?");
            stmt.setInt(1, p.getUserid());
            stmt.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    @PostMapping("/declineProfessor")
    public void postMethodName2(@RequestBody Professor p) {
        //TODO: process POST request
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Delete from professor where idprofessor=?");
            stmt.setInt(1, p.getUserid());
            stmt.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @PostMapping("/cv")
    public void cv(@RequestBody CV cv) {
        //TODO: process POST request
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO cv(idprofessor, cv) VALUES(?,?)");
            stmt.setInt(1, cv.getIdprofessor());
            stmt.setBytes(2, cv.getCv());
            stmt.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }

    @GetMapping("/getCV")
    public CV getMethodName(@RequestParam int id) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM cv WHERE idprofessor=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                return new CV(rs.getInt("idprofessor"), rs.getBytes("cv"));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
    
}
