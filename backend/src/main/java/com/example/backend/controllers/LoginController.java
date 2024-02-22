package com.example.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.DB;
import com.example.backend.models.Professor;
import com.example.backend.models.Student;
import com.example.backend.models.User;
import com.example.hashing.PasswordHashing;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/userLogin")
@RestController
public class LoginController {
    @GetMapping("/checkUser")
    public User checkUser(@RequestParam String email, @RequestParam String password){
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where email=? and password=?");
            stmt.setString(1, email);
            String hashed = PasswordHashing.hashPassword(password);
            if(hashed==null) return null;
            stmt.setString(2, hashed);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                PreparedStatement stmt2 = conn.prepareStatement("Select image from profileimage where iduser=?");
                stmt2.setInt(1, rs.getInt("iduser"));
                ResultSet rs2 = stmt2.executeQuery();
                if(!rs2.next()) return null;
                byte[] image = rs2.getBytes("image");
                User u = new User(rs.getInt("iduser"), rs.getString("email"), rs.getString("password"), rs.getString("name"), rs.getString("surname"), rs.getString("adress"), rs.getString("contact"), rs.getString("safetyQuestion"), rs.getString("safetyAnswer"), rs.getInt("gender"), rs.getString("username"), image);
                PreparedStatement stmt1 = conn.prepareStatement("Select * from student where idstudent=?");
                stmt1.setInt(1, u.getUserid());
                rs = stmt1.executeQuery();
                if(rs.next()) u.setType(1);
                else {
                    PreparedStatement stmt3 = conn.prepareStatement("Select * from admin where iduser=?");
                    stmt3.setInt(1, u.getUserid());
                    rs = stmt3.executeQuery();
                    if(!rs.next()) u.setType(2);
                    else return null;
                }
                return u;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @GetMapping("/getStudent")
    public Student getStudent(@RequestParam int id){
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where iduser=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                PreparedStatement stmt1 = conn.prepareStatement("Select * from student where idstudent=?");
                stmt1.setInt(1, id);
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()){
                    PreparedStatement stmt2 = conn.prepareStatement("Select image from profileimage where iduser=?");
                    stmt2.setInt(1, id);
                    ResultSet rs2 = stmt2.executeQuery();
                    if(!rs2.next()) return null;
                    byte[] image = rs2.getBytes("image");
                    Student s = new Student(rs.getInt("iduser"), rs.getString("email"), rs.getString("password"), rs.getString("name"), rs.getString("surname"), rs.getString("adress"), rs.getString("contact"), rs.getString("safetyQuestion"), rs.getString("safetyAnswer"), rs.getInt("gender"), rs.getString("username"), rs1.getInt("schoolType"), rs1.getInt("grade"), image);
                    s.setType(1);
                    return s;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }   
        return null;
    }

    @GetMapping("/getProfessor")
    public Professor getProfessor(@RequestParam int id){
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where iduser=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                PreparedStatement stmt1 = conn.prepareStatement("Select * from professor where idprofessor=?");
                stmt1.setInt(1, id);
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()){
                    PreparedStatement stmt2 = conn.prepareStatement("Select image from profileimage where iduser=?");
                    stmt2.setInt(1, id);
                    ResultSet rs2 = stmt2.executeQuery();
                    if(!rs2.next()) return null;
                    byte[] image = rs2.getBytes("image");
                    Professor p = new Professor(rs.getInt("iduser"), rs.getString("email"), rs.getString("password"), rs.getString("name"), rs.getString("surname"), rs.getString("adress"), rs.getString("contact"), rs.getString("safetyQuestion"), rs.getString("safetyAnswer"), rs.getInt("gender"), rs.getString("username"), rs1.getString("aboutSite"), image, rs1.getBoolean("accepted"));
                    p.setType(2);
                    if(rs1.getBoolean("accepted")) return p;
                    else return null;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }   
        return null;
    }
    
    @PostMapping("/changePassword")
    public void postMethodName(@RequestBody User u) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Update user set password=? where iduser=?");
            String hashed = PasswordHashing.hashPassword(u.getPassword());
            if(hashed==null) return;
            stmt.setString(1, hashed);
            stmt.setInt(2, u.getUserid());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/checkUsername")
    public User checkUsername(@RequestParam String username) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where username=?");
            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                PreparedStatement stmt2 = conn.prepareStatement("Select image from profileimage where iduser=?");
                stmt2.setInt(1, rs.getInt("iduser"));
                ResultSet rs2 = stmt2.executeQuery();
                if(!rs2.next()) return null;
                byte[] image = rs2.getBytes("image");
                User u = new User(rs.getInt("iduser"), rs.getString("email"), rs.getString("password"), rs.getString("name"), rs.getString("surname"), rs.getString("adress"), rs.getString("contact"), rs.getString("safetyQuestion"), rs.getString("safetyAnswer"), rs.getInt("gender"), rs.getString("username"), image);
                PreparedStatement stmt1 = conn.prepareStatement("Select * from student where idstudent=?");
                stmt1.setInt(1, u.getUserid());
                rs = stmt1.executeQuery();
                if(rs.next()) u.setType(1);
                else u.setType(2);
                return u;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/admin")
    public User admin(@RequestParam String email, @RequestParam String password) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from user where email=? and password=?");
            stmt.setString(1, email);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                User u = new User(rs.getInt("iduser"), rs.getString("email"), rs.getString("password"), rs.getString("name"), rs.getString("surname"), rs.getString("adress"), rs.getString("contact"), rs.getString("safetyQuestion"), rs.getString("safetyAnswer"), rs.getInt("gender"), rs.getString("username"), null);
                PreparedStatement stmt1 = conn.prepareStatement("Select * from admin where iduser=?");
                stmt1.setInt(1, u.getUserid());
                rs = stmt1.executeQuery();
                if(rs.next()) u.setType(3);
                else return null;
                return u;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
    
}
