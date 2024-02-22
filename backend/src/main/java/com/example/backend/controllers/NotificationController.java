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
import com.example.backend.models.Notification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/notification")
@RestController
public class NotificationController {
    @GetMapping("")
    public List<Notification> getMethodName(@RequestParam int id) {
        List<Notification> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from notifications where forWho=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                l.add(new Notification(rs.getInt("idnotifications"), rs.getInt("forWho"), rs.getInt("idsubject"), rs.getInt("idprofessor"), rs.getString("reason"), rs.getBoolean("seen")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @PostMapping("/seen")
    public void postMethodName(@RequestBody int id) {
        //TODO: process POST request
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Update notifications set seen=true where forWho=? and seen=false");
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return;
    }

    @PostMapping("/create")
    public void postMethodName(@RequestBody Notification n) {
        try {
            Connection conn = DB.source().getConnection();
            System.out.println(n.getFor());
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notifications(forWho, idsubject,idprofessor, reason) VALUES (?,?,?,?)");
            stmt.setInt(1, n.getFor());
            stmt.setInt(2, n.getIdsubject());
            stmt.setInt(3, n.getIdprofessor());
            stmt.setString(4, n.getReason());
            if(stmt.executeUpdate()>0) System.out.println("to je to");
            
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    
}
