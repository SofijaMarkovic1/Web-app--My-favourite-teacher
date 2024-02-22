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
import com.example.backend.models.NewSubject;
import com.example.backend.models.Professor;
import com.example.backend.models.Subject;
import com.example.backend.models.Teaches;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;






@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/admin")
@RestController
public class AdminController {
    

    @GetMapping("/profToAge")
    public List<Integer> profToAge() {
        List<Integer> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt1 = conn.prepareStatement("Select COUNT(*) from workswith where idage=1");
            ResultSet rs = stmt1.executeQuery();
            if(rs.next()){
                cnt.add(rs.getInt("COUNT(*)"));
            }
            PreparedStatement stmt2 = conn.prepareStatement("Select COUNT(*) from workswith where idage=2");
            rs = stmt2.executeQuery();
            if(rs.next()){
                cnt.add(rs.getInt("COUNT(*)"));
            }
            PreparedStatement stmt3 = conn.prepareStatement("Select COUNT(*) from workswith where idage=3");
            rs = stmt3.executeQuery();
            if(rs.next()){
                cnt.add(rs.getInt("COUNT(*)"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

    @GetMapping("/profToSubject")
    public List<Integer> profToSubject() {
        List<Integer> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt1 = conn.prepareStatement("Select idsubject from subject");
            ResultSet rs = stmt1.executeQuery();
            while(rs.next()){
                PreparedStatement stmt2 = conn.prepareStatement("Select COUNT(*) from teaches where idsubject=?");
                stmt2.setInt(1, rs.getInt("idsubject"));
                ResultSet rs1 = stmt2.executeQuery();
                if(rs1.next()){
                    cnt.add(rs1.getInt("COUNT(*)"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

    @GetMapping("/subjectNames")
    public List<String> subjectNames() {
        List<String> names = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt1 = conn.prepareStatement("Select name from subject");
            ResultSet rs = stmt1.executeQuery();
            while (rs.next()) {
                names.add(rs.getString("name"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return names;
    }

    @GetMapping("/profGender")
    public List<Integer> profGender() {
        List<Integer> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt1 = conn.prepareStatement("Select COUNT(*) from professor p, user u where p.idprofessor=u.iduser and u.gender=1");
            ResultSet rs = stmt1.executeQuery();
            if(rs.next()) cnt.add(rs.getInt("COUNT(*)"));
            PreparedStatement stmt2 = conn.prepareStatement("Select COUNT(*) from professor p, user u where p.idprofessor=u.iduser and u.gender=2");
            ResultSet rs1 = stmt2.executeQuery();
            if(rs1.next()) cnt.add(rs.getInt("COUNT(*)"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }
    @GetMapping("/studGender")
    public List<Integer> studGender() {
        List<Integer> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt1 = conn.prepareStatement("Select COUNT(*) from student s, user u where s.idstudent=u.iduser and u.gender=1");
            ResultSet rs = stmt1.executeQuery();
            if(rs.next()) cnt.add(rs.getInt("COUNT(*)"));
            PreparedStatement stmt2 = conn.prepareStatement("Select COUNT(*) from student s, user u where s.idstudent=u.iduser and u.gender=2");
            ResultSet rs1 = stmt2.executeQuery();
            if(rs1.next()) cnt.add(rs.getInt("COUNT(*)"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

    @GetMapping("/classesPerDayOfWeek")
    public List<Double> classesPerDayOfWeek() {
        List<Double> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT all_days.days AS dan_u_nedelji, COALESCE(AVG(TIMESTAMPDIFF(HOUR, p.dateAndTimeStart, p.dateAndTimeEnd)), 0) AS prosecan_broj_casova FROM (SELECT 1 AS days UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7) all_days LEFT JOIN pastclass p ON DAYOFWEEK(p.dateAndTimeStart) = all_days.days AND YEAR(p.dateAndTimeStart) = 2023 GROUP BY all_days.days");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                cnt.add(rs.getDouble("prosecan_broj_casova"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

    @GetMapping("/10professors")
    public List<String> getMethodName() {
        List<String> names = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT\n" + //
                    "    concat(u.name, concat(\" \", u.surname)) as name,\n" + //
                    "    SUM(TIMESTAMPDIFF(HOUR, dateAndTimeStart, dateAndTimeEnd)) AS ukupno_casova\n" + //
                    "FROM\n" + //
                    "    pastclass p, user u\n" + //
                    "WHERE\n" + //
                    "    YEAR(dateAndTimeStart) = 2023 and u.iduser = p.idprofessor\n" + //
                    "GROUP BY\n" + //
                    "    idprofessor\n" + //
                    "ORDER BY\n" + //
                    "    ukupno_casova DESC\n" + //
                    "LIMIT 10");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                names.add(rs.getString("name"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return names;
    }

    @GetMapping("/classesPerMonth")
    public List<Integer> getMethodName(@RequestParam String name) {
        List<Integer> cnt = new ArrayList<>();
        System.out.println(name);
        try {
            Connection conn = DB.source().getConnection();
            for(int i=1;i<13;i++){
                PreparedStatement stmt = conn.prepareStatement("SELECT MONTH(all_months.month) AS mesec, COALESCE(SUM(COALESCE(TIMESTAMPDIFF(HOUR, p.dateAndTimeStart, p.dateAndTimeEnd), 0)), 0) AS ukupno_casova FROM (SELECT ? AS month) all_months LEFT JOIN pastclass p ON MONTH(p.dateAndTimeStart) = all_months.month AND YEAR(p.dateAndTimeStart) = 2023 join professor pr on p.idprofessor = pr.idprofessor join user u on u.iduser = pr.idprofessor and u.name = ? GROUP BY mesec ORDER BY mesec;");
                stmt.setInt(1, i);
                stmt.setString(2, name);
                ResultSet rs = stmt.executeQuery();
                if(rs.next()){
                    cnt.add(rs.getInt("ukupno_casova"));
                }
                else{
                    cnt.add(0);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

    @GetMapping("/classesPerSubject")
    public List<Integer> classesPerSubject() {
        List<Integer> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Select idsubject from subject");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                PreparedStatement stmt1 = conn.prepareStatement("Select COUNT(*) from pastclass where idsubject=?");
                stmt1.setInt(1, rs.getInt("idsubject"));
                ResultSet rs1 = stmt1.executeQuery();
                if(rs1.next()) cnt.add(rs1.getInt("COUNT(*)"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

    @GetMapping("/classesPerProf")
    public List<Integer> classesPerProf() {
        List<Integer> cnt = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT\n" + //
                    "    idprofessor,\n" + //
                    "    SUM(TIMESTAMPDIFF(HOUR, dateAndTimeStart, dateAndTimeEnd)) AS ukupno_casova\n" + //
                    "FROM\n" + //
                    "    pastclass\n" + //
                    "GROUP BY\n" + //
                    "    idprofessor\n" + //
                    "ORDER BY\n" + //
                    "    ukupno_casova DESC\n" + //
                    "LIMIT 10;");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                cnt.add(rs.getInt("ukupno_casova"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cnt;
    }

     @GetMapping("/allProfs")
    public List<Professor> getAllProfessors() {
        List<Professor> list = new ArrayList<>();
        
        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM professor");
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
    @PostMapping("/deactivateProf")
    public void deactivateProf(@RequestBody int id) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE professor SET accepted=false WHERE idprofessor=?");
            stmt.setInt(1, id);
            stmt.executeUpdate();
            PreparedStatement stmt1 = conn.prepareStatement("UPDATE workswith SET accepted=false WHERE idprofessor=?");
            stmt1.setInt(1, id);
            stmt1.executeUpdate();
            PreparedStatement stmt2 = conn.prepareStatement("UPDATE teaches SET accepted=false WHERE idprofessor=?");
            stmt2.setInt(1, id);
            stmt2.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return;
    }

    @PostMapping("/activateProf")
    public void activateProf(@RequestBody int id) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE professor SET accepted=true WHERE idprofessor=?");
            stmt.setInt(1, id);
            stmt.executeUpdate();
            PreparedStatement stmt1 = conn.prepareStatement("UPDATE workswith SET accepted=true WHERE idprofessor=?");
            stmt1.setInt(1, id);
            stmt1.executeUpdate();
            PreparedStatement stmt2 = conn.prepareStatement("UPDATE teaches SET accepted=true WHERE idprofessor=?");
            stmt2.setInt(1, id);
            stmt2.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return;
    }

    @PostMapping("/declineProf")
    public void declineProf(@RequestBody int id) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt3 = conn.prepareStatement("SELECT username, email FROM user where iduser=?");
            stmt3.setInt(1, id);
            ResultSet rs = stmt3.executeQuery();
            String email, username;
            if(rs.next()){
                email = rs.getString("email");
                username = rs.getString("username");
                PreparedStatement stmt4 = conn.prepareStatement("Insert into forbidenemails(email) values(?)");
                stmt4.setString(1, email);
                stmt4.executeUpdate();
                PreparedStatement stmt5 = conn.prepareStatement("Insert into forbidenusername(username) values(?)");
                stmt5.setString(1, username);
                stmt5.executeUpdate();
            }
            PreparedStatement stmt1 = conn.prepareStatement("DELETE FROM workswith WHERE idprofessor=?");
            stmt1.setInt(1, id);
            stmt1.executeUpdate();
            PreparedStatement stmt2 = conn.prepareStatement("DELETE FROM teaches WHERE idprofessor=?");
            stmt2.setInt(1, id);
            stmt2.executeUpdate();
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM professor WHERE idprofessor=?");
            stmt.setInt(1, id);
            stmt.executeUpdate();
            PreparedStatement stmt7 = conn.prepareStatement("DELETE FROM profileimage WHERE iduser=?");
            stmt7.setInt(1, id);
            stmt7.executeUpdate();
            PreparedStatement stmt6 = conn.prepareStatement("DELETE FROM user WHERE iduser=?");
            stmt6.setInt(1, id);
            stmt6.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return;
    }
    
    @GetMapping("/newSubjects")
    public List<NewSubject> newSubjects() {
        List<NewSubject> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM newsubject");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                l.add(new NewSubject(rs.getInt("idnewsubject"), rs.getString("name"), rs.getInt("idprofessor")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }
    
    @PostMapping("/addSubject")
    public Subject addSubject(@RequestBody String name) {
        //TODO: process POST request
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO subject(name) values(?)");
            stmt.setString(1, name);
            stmt.executeUpdate();
            PreparedStatement stmt1 = conn.prepareStatement("SELECT * from subject where name=?");
            stmt1.setString(1, name);
            ResultSet rs = stmt1.executeQuery();
            if(rs.next()){
                return new Subject(rs.getInt("idsubject"), name);
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/deleteNewSubject")
    public void deleteNewSubject(@RequestBody NewSubject id) {
        //TODO: process POST request
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM newsubject WHERE idnewsubject=?");
            stmt.setInt(1, id.getIdnewsubject());
            stmt.executeUpdate();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return;
    }

    @PostMapping("/addTeaches")
    public void addTeaches(@RequestBody Teaches t) {
        //TODO: process POST request
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO teaches(idprofessor, idsubject, accepted) VALUES(?,?,true)");
            stmt.setInt(1, t.getIdprofessor());
            stmt.setInt(2, t.getIdsubject());
            stmt.executeUpdate();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return;
    }
    
    
    
    
    
    
    
    
}
