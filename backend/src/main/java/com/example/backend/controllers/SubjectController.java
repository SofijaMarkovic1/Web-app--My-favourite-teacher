package com.example.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.DB;
import com.example.backend.models.Subject;
import com.example.backend.models.SubjectRequest;
import com.example.backend.models.Teaches;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/subject")
@RestController
public class SubjectController {
    
    @GetMapping("")
    public List<Subject> getSubjects() {
        try{
            List<Subject> subjects = new ArrayList<>();
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from subject");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                subjects.add(new Subject(rs.getInt("idsubject"), rs.getString("name")));
            }
            return subjects;
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/new")
    public void postMethodName(@RequestBody SubjectRequest s) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Insert into newsubject(name, idprofessor) values(?,?)");
            stmt.setString(1, s.getName());
            stmt.setInt(2, s.getIdprofessor());
            stmt.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        return;
        
    }

    @PostMapping("/newTeaches")
    public void postMethodName(@RequestBody Teaches t) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Insert into teaches(idprofessor,idsubject) values(?,?)");
            stmt.setInt(1, t.getIdprofessor());
            stmt.setInt(2, t.getIdsubject());
            stmt.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        return;
    }
    
    @GetMapping("/getAllTeaches")
    public List<Teaches> getAllTeaches() {
        List<Teaches> teaches = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from teaches where accepted=1");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                teaches.add(new Teaches(rs.getInt("idprofessor"), rs.getInt("idsubject")));
            }
            return teaches;
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return teaches;
    }
    
    
}
