package com.example.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.DB;
import com.example.backend.models.Student;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/student")
@RestController
public class StudentController {
    
    @GetMapping("/cnt")
    public int getMethodName() {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select count(*) from student");
            ResultSet rs = stmt.executeQuery();
            if(rs.next()) return rs.getInt("count(*)");
        }catch(Exception e){
            e.printStackTrace();
        }
        return -1;
    }

    @GetMapping("/allStudents")
    public List<Student> allStudents() {
        List<Student> list = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from student");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                PreparedStatement stmt1 = conn.prepareStatement("Select * from user where iduser=?");
                stmt1.setInt(1, rs.getInt("idstudent"));
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()){
                    PreparedStatement stmt2 = conn.prepareStatement("Select * from profileimage where iduser=?");
                    stmt2.setInt(1, rs.getInt("idstudent"));
                    ResultSet rs2 = stmt2.executeQuery();
                    if(rs2.next()){
                        list.add(new Student(rs.getInt("idstudent"),rs1.getString("email"), rs1.getString("password"), rs1.getString("name"), rs1.getString("surname"), rs1.getString("adress"), rs1.getString("contact"), rs1.getString("safetyQuestion"), rs1.getString("safetyAnswer"), rs1.getInt("gender"), rs1.getString("username"), rs.getInt("schoolType"), rs.getInt("grade"), rs2.getBytes("image")));
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @GetMapping("/allStudentsForProf")
    public List<Student> allStudents(@RequestParam int idProf) {
        List<Student> list = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT DISTINCT s.idstudent, s.schoolType, s.grade FROM student s JOIN pastclass p ON p.idstudent = s.idstudent WHERE p.idprofessor = ?");
            stmt.setInt(1, idProf);
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                PreparedStatement stmt1 = conn.prepareStatement("Select * from user where iduser=?");
                stmt1.setInt(1, rs.getInt("s.idstudent"));
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()){
                    PreparedStatement stmt2 = conn.prepareStatement("Select * from profileimage where iduser=?");
                    stmt2.setInt(1, rs.getInt("s.idstudent"));
                    ResultSet rs2 = stmt2.executeQuery();
                    if(rs2.next()){
                        list.add(new Student(rs.getInt("s.idstudent"),rs1.getString("email"), rs1.getString("password"), rs1.getString("name"), rs1.getString("surname"), rs1.getString("adress"), rs1.getString("contact"), rs1.getString("safetyQuestion"), rs1.getString("safetyAnswer"), rs1.getInt("gender"), rs1.getString("username"), rs.getInt("s.schoolType"), rs.getInt("s.grade"), rs2.getBytes("image")));
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return list;
    }
    

    @GetMapping("")
    public List<Student> getMethodName(@RequestParam String param) {
        List<Student> list = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select * from student");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                PreparedStatement stmt1 = conn.prepareStatement("Select * from user where iduser=?");
                stmt1.setInt(1, rs.getInt("idstudent"));
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()){
                    PreparedStatement stmt2 = conn.prepareStatement("Select * from profileimage where iduser=?");
                    stmt2.setInt(1, rs.getInt("idstudent"));
                    ResultSet rs2 = stmt2.executeQuery();
                    if(rs2.next()){
                        list.add(new Student(rs.getInt("idstudent"),rs1.getString("email"), rs1.getString("password"), rs1.getString("name"), rs1.getString("surname"), rs1.getString("adress"), rs1.getString("contact"), rs1.getString("safetyQuestion"), rs1.getString("safetyAnswer"), rs1.getInt("gender"), rs1.getString("username"), rs.getInt("schoolType"), rs.getInt("grade"), rs2.getBytes("image")));
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @GetMapping("/checkEmail")
    public boolean checkEmail(@RequestParam String email) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select count(*) from user where email=?");
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()) {
                if(rs.getInt("count(*)")==0) return true;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @PostMapping("/editStudent")
    public void editStudent(@RequestBody Student s) {
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Update user set name=?, surname=?, adress=?, email=?, contact=? where iduser=?");
            stmt.setString(1, s.getName());
            stmt.setString(2, s.getSurname());
            stmt.setString(3, s.getAdress());
            stmt.setString(4, s.getEmail());
            stmt.setString(5, s.getContact());
            stmt.setInt(6, s.getUserid());
            if(stmt.executeUpdate()>0){
                PreparedStatement stmt1 = conn.prepareStatement("Update student set schoolType=?, grade=? where idstudent=?");
                stmt1.setInt(1, s.getSchoolType());
                stmt1.setInt(2, s.getGrade());
                stmt1.setInt(3, s.getUserid());
                if(stmt1.executeUpdate()>0){
                    PreparedStatement stmt2 = conn.prepareStatement("Update profileimage set image=? where iduser=?");
                    stmt2.setBytes(1, s.getImage());
                    stmt2.setInt(2, s.getUserid());
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
            e.printStackTrace();
        }
        
    }

    @GetMapping("/average")
    public double average(@RequestParam int id) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select count(*) from pastclass where idstudent=? and professorGrade!=0");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                if(rs.getInt("count(*)")<3) return 0;
                PreparedStatement stmt1 = conn.prepareStatement("Select AVG(professorGrade) from pastclass where idstudent=? and professorGrade!=0");
                stmt1.setInt(1, id);
                rs = stmt1.executeQuery();
                if(rs.next()){
                    return rs.getDouble("AVG(professorGrade)");
                } 
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    @GetMapping("/getStudentsByAge")
    public List<Student> getPrimary1(@RequestParam int idAge) {
        List<Student> list = new ArrayList<>();
        try{
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt;
            if(idAge==1){
                stmt = conn.prepareStatement("Select * from student where schoolType=1 and grade>=1 and grade<=4");
            }
            else if(idAge==2){
                stmt = conn.prepareStatement("Select * from student where schoolType=1 and grade>=5 and grade<=8");
            }
            else{
                stmt = conn.prepareStatement("Select * from student where schoolType>1");
            }
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                PreparedStatement stmt1 = conn.prepareStatement("Select * from user where iduser=?");
                stmt1.setInt(1, rs.getInt("idstudent"));
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()){
                    PreparedStatement stmt2 = conn.prepareStatement("Select * from profileimage where iduser=?");
                    stmt2.setInt(1, rs.getInt("idstudent"));
                    ResultSet rs2 = stmt2.executeQuery();
                    if(rs2.next()){
                        list.add(new Student(rs.getInt("idstudent"),rs1.getString("email"), rs1.getString("password"), rs1.getString("name"), rs1.getString("surname"), rs1.getString("adress"), rs1.getString("contact"), rs1.getString("safetyQuestion"), rs1.getString("safetyAnswer"), rs1.getInt("gender"), rs1.getString("username"), rs.getInt("schoolType"), rs.getInt("grade"), rs2.getBytes("image")));
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return list;
    }
    
    
    
    
    
}
