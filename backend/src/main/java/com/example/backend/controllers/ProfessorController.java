package com.example.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.models.Professor;
import com.example.backend.models.Subject;
import com.example.backend.models.WorkingHours;
import com.example.backend.models.WorksWith;
import com.example.backend.db.DB;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/professor")
@RestController
public class ProfessorController {

    @GetMapping("/cnt")
    public int getMethodName() {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select count(*) from professor where accepted=1");
            ResultSet rs = stmt.executeQuery();
            if(rs.next()) return rs.getInt("count(*)");
        }catch(Exception e){
            e.printStackTrace();
        }
        return -1;
    }

    @GetMapping("")
    public List<Professor> getAllProfessors() {
        List<Professor> list = new ArrayList<>();
        
        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM professor WHERE accepted=1");
            ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                try (PreparedStatement stmt1 = conn.prepareStatement("SELECT * FROM user WHERE iduser=?")) {
                    stmt1.setInt(1, rs.getInt("idprofessor"));
                    try (ResultSet rs1 = stmt1.executeQuery()) {
                        if (rs1.next()) {
                            try (PreparedStatement stmt2 = conn.prepareStatement("SELECT * FROM profileimage WHERE iduser=?")) {
                                stmt2.setInt(1, rs.getInt("idprofessor"));
                                try (ResultSet rs2 = stmt2.executeQuery()) {
                                    if (rs2.next()) {
                                        list.add(new Professor(rs.getInt("idprofessor"), rs1.getString("email"), rs1.getString("password"), rs1.getString("name"), rs1.getString("surname"), rs1.getString("adress"), rs1.getString("contact"), rs1.getString("safetyQuestion"), rs1.getString("safetyAnswer"), rs1.getInt("gender"), rs1.getString("username"), rs.getString("aboutSite"), rs2.getBytes("image"), rs.getBoolean("accepted")));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    
    @GetMapping("/worksWith")
    public List<Professor> worksWith(@RequestParam int age) {
        List<Professor> list = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM professor p, workswith w WHERE p.accepted=1 and w.idprofessor=p.idprofessor and w.idage=?");
            stmt.setInt(1, age);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                try (PreparedStatement stmt1 = conn.prepareStatement("SELECT * FROM user WHERE iduser=?")) {
                    stmt1.setInt(1, rs.getInt("p.idprofessor"));
                    try (ResultSet rs1 = stmt1.executeQuery()) {
                        if (rs1.next()) {
                            try (PreparedStatement stmt2 = conn.prepareStatement("SELECT * FROM profileimage WHERE iduser=?")) {
                                stmt2.setInt(1, rs.getInt("p.idprofessor"));
                                try (ResultSet rs2 = stmt2.executeQuery()) {
                                    if (rs2.next()) {
                                        list.add(new Professor(rs.getInt("p.idprofessor"), rs1.getString("email"), rs1.getString("password"), rs1.getString("name"), rs1.getString("surname"), rs1.getString("adress"), rs1.getString("contact"), rs1.getString("safetyQuestion"), rs1.getString("safetyAnswer"), rs1.getInt("gender"), rs1.getString("username"), rs.getString("p.aboutSite"), rs2.getBytes("image"), rs.getBoolean("p.accepted")));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    
    @GetMapping("/getWorksWith")
    public List<String> getWorksWith(@RequestParam int id) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT a.age FROM workswith w, age a WHERE w.accepted=1 and w.idprofessor=? and w.idage = a.idage");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            List<String> l = new ArrayList<>();
            while(rs.next()) l.add(rs.getString("a.age"));
            return l;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @GetMapping("/subjects")
    public List<Subject> getSubjects(@RequestParam int id) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT s.idsubject, s.name FROM teaches t, subject s WHERE t.accepted=1 and t.idprofessor=? and t.idsubject = s.idsubject");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            List<Subject> l = new ArrayList<>();
            while(rs.next()) l.add(new Subject(rs.getInt("s.idsubject"), rs.getString("s.name")));
            return l;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @GetMapping("/average")
    public double average(@RequestParam int id) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT COALESCE(AVG(studentGrade), 0) AS AverageGrade FROM pastclass WHERE studentGrade!=0 AND idprofessor=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if(rs.next()) return rs.getDouble("AverageGrade");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1;
    }

    @GetMapping("/comments")
    public List<String> comments(@RequestParam int id) {
        System.out.println(id);
        List<String> l = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT studentComment FROM pastclass WHERE studentComment is not null AND idprofessor=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                System.out.println(rs.getString("studentComment"));
                l.add(rs.getString("studentComment"));
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return l;
    }

    @PostMapping("/edit")
    public void postMethodName(@RequestBody Professor p) {
        try{
            System.out.println("1");
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Update user set name=?, surname=?, adress=?, email=?, contact=? where iduser=?");
            stmt.setString(1, p.getName());
            stmt.setString(2, p.getSurname());
            stmt.setString(3, p.getAdress());
            stmt.setString(4, p.getEmail());
            stmt.setString(5, p.getContact());
            stmt.setInt(6, p.getUserid());
            if(stmt.executeUpdate()>0){
                PreparedStatement stmt1 = conn.prepareStatement("DELETE from workswith where idprofessor=?");
                stmt1.setInt(1, p.getUserid());
                if(stmt1.executeUpdate()>=0){
                    PreparedStatement stmt2 = conn.prepareStatement("Update profileimage set image=? where iduser=?");
                    stmt2.setBytes(1, p.getImage());
                    stmt2.setInt(2, p.getUserid());
                    if(stmt2.executeUpdate()>0){
                        return;
                    }
                    else{
                        System.out.println("ERROR 3");
                    }
                }
                else{
                    System.out.println("ERROR 2");
                }
            }
            else{
                System.out.println("ERROR 1");
            }
        }catch(Exception e){
            System.out.println("tu sam2");
            e.printStackTrace();
        }
    }

    @PostMapping("/insertWorksWith")
    public void postMethodName(@RequestBody WorksWith w) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT into workswith(idprofessor, idage) values(?,?)");
            stmt.setInt(1, w.getIdprofessor());
            stmt.setInt(2, w.getIdage());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/insertWorkingHours")
    public int postMethodName(@RequestBody WorkingHours w) {
        //TODO: process POST request
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT into workinghours(idprofessor, date, startTime, endTime) values(?,?,?,?)");
            java.util.Date utilDate = dateFormat.parse(w.getDate());
            Date sqlDate = new Date(utilDate.getTime());
            Time sqlTime1;
            if(w.getStartTime()=="") {
                java.util.Date utilTime = timeFormat.parse("00:00");
                sqlTime1 = new Time(utilTime.getTime());
            }
            else {
                java.util.Date utilTime = timeFormat.parse(w.getStartTime());
                sqlTime1 = new Time(utilTime.getTime());
            }
            Time sqlTime2;
            if(w.getEndTime()=="") {
                java.util.Date utilTime = timeFormat.parse("23:59");
                sqlTime2 = new Time(utilTime.getTime());
            }
            else {
                java.util.Date utilTime = timeFormat.parse(w.getEndTime());
                sqlTime2 = new Time(utilTime.getTime());
            }
            if(w.getStartTime()==""){
                Timestamp timestamp1 = new Timestamp(sqlDate.getTime() + sqlTime1.getTime());
                Timestamp timestamp2 = new Timestamp(sqlDate.getTime() + sqlTime2.getTime());
                PreparedStatement stmt1 = conn.prepareStatement("SELECT * from class where idprofessor=? and status=1 and dateAndTimeStart>=? and dateAndTimeEnd<=?");
                stmt1.setInt(1, w.getIdprofessor());
                stmt1.setTimestamp(2, timestamp1);
                stmt1.setTimestamp(3, timestamp2);
                ResultSet rs = stmt1.executeQuery();
                if(rs.next()){
                    return -1;
                }

            }
            else{
                Timestamp timestamp1 = new Timestamp(sqlDate.getTime() + sqlTime1.getTime());
                Timestamp timestamp2 = new Timestamp(sqlDate.getTime() + sqlTime2.getTime());
                PreparedStatement stmt1 = conn.prepareStatement("SELECT * from class where idprofessor=? and status=1 and ((DATE(dateAndTimeStart)=DATE(?) and dateAndTimeStart not between ? and ?) or (DATE(dateAndTimeEnd)=DATE(?) and dateAndTimeEnd not between ? and ?))");
                stmt1.setInt(1, w.getIdprofessor());
                stmt1.setTimestamp(2, timestamp1);
                stmt1.setTimestamp(3, timestamp1);
                stmt1.setTimestamp(4, timestamp2);
                stmt1.setTimestamp(5, timestamp2);
                stmt1.setTimestamp(6, timestamp1);
                stmt1.setTimestamp(7, timestamp2);
                ResultSet rs = stmt1.executeQuery();
                if(rs.next()){
                    return -1;
                }
            }
            if(w.getStartTime()==""){
                sqlTime1 = null;
            }
            if(w.getEndTime()==""){
                sqlTime2 = null;
            }
            stmt.setInt(1, w.getIdprofessor());
            stmt.setDate(2, sqlDate);

            stmt.setTime(3, sqlTime1);
            stmt.setTime(4, sqlTime2);
            stmt.executeUpdate();
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -2;
    }

    @GetMapping("/getWorkingHoursForProf")
    public List<WorkingHours> getMethodName(@RequestParam int id) {
        List<WorkingHours> list = new ArrayList<>();
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * from workinghours where idprofessor=?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                String startTime = null, endTime=null;
                if(rs.getTime("startTime")!=null){
                    startTime = timeFormat.format(rs.getTime("startTime"));
                    endTime = timeFormat.format(rs.getTime("endTime"));
                }
                list.add(new WorkingHours(rs.getInt("idworkinghours"), rs.getInt("idprofessor"), dateFormat.format(rs.getDate("date")), startTime, endTime));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
    

}
