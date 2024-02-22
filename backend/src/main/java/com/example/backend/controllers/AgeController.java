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
import com.example.backend.models.Age;
import com.example.backend.models.WorksWith;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/age")
@RestController
public class AgeController {
    
    @GetMapping("")
    public List<Age> getSubjects() {
        try{
            List<Age> ages = new ArrayList<>();
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from age");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                ages.add(new Age(rs.getInt("idage"), rs.getString("age")));
            }
            return ages;
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/newWorksWith")
    public void postMethodName(@RequestBody WorksWith w) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Insert into workswith(idprofessor,idage) values(?,?)");
            stmt.setInt(1, w.getIdprofessor());
            stmt.setInt(2, w.getIdage());
            stmt.executeUpdate();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        
        return;
    }

    @GetMapping("/getWorksWith")
    public List<WorksWith> getMethodName(@RequestParam int id) {
        List<WorksWith> worksWiths = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from workswith where idprofessor=? and accepted=1");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                worksWiths.add(new WorksWith(id, rs.getInt("idage")));
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return worksWiths;
    }
    
    
    
}
