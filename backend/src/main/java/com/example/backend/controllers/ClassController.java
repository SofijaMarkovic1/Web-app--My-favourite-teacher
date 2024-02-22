package com.example.backend.controllers;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.DB;
import com.example.backend.models.Class;
import com.example.backend.models.PastClass;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/class")
@RestController
public class ClassController {
    

    @GetMapping("/professorAvailable")
    public int getMethodName(@RequestParam int id, @RequestParam String date, @RequestParam boolean d) {
        try {
            LocalDateTime datee = LocalDateTime.parse(date);
            Connection conn = DB.source().getConnection();
            datee = datee.plusHours(1);
            LocalDateTime end = datee.plusMinutes(90);
            if(d) {
                end = end.plusMinutes(90);
            }
            System.out.println(end.toString());
            PreparedStatement stmt3 = conn.prepareStatement("SELECT * FROM workinghours WHERE idprofessor=? AND date=DATE(?)");
            stmt3.setInt(1, id);
            stmt3.setTimestamp(2, Timestamp.valueOf(datee));
            ResultSet rs1 = stmt3.executeQuery();
            ResultSet rs;
            if(!rs1.next()){
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM professor WHERE idprofessor=? AND (? BETWEEN workStart AND workEnd) AND (? BETWEEN workStart AND workEnd)");
                stmt.setInt(1, id);
                stmt.setTime(2, Time.valueOf(datee.toLocalTime()));
                stmt.setTime(3, Time.valueOf(end.toLocalTime()));
                rs = stmt.executeQuery();
                if(!rs.next()) return -1;
            }
            
                // dohvati sve casove da vidis da nije neki tad
                PreparedStatement stmt1 = conn.prepareStatement("SELECT * FROM class WHERE idprofessor=? AND status=1 AND (? >= dateAndTimeStart AND  ? <= dateAndTimeEnd OR ? >= dateAndTimeStart AND ? <= dateAndTimeEnd)");
                stmt1.setInt(1, id);
                stmt1.setTimestamp(2, Timestamp.valueOf(datee));
                stmt1.setTimestamp(3, Timestamp.valueOf(datee));
                stmt1.setTimestamp(4, Timestamp.valueOf(end));
                stmt1.setTimestamp(5, Timestamp.valueOf(end));
                rs = stmt1.executeQuery();
                if(rs.next()) return -2;
                PreparedStatement stmt2 = conn.prepareStatement("SELECT * FROM workinghours WHERE idprofessor=? AND DATE(?) = date and (startTime=null or TIME(?) not between startTime and endTime or TIME(?) not between startTime and endTime)");
                stmt2.setInt(1, id);
                stmt2.setTimestamp(2, Timestamp.valueOf(datee));
                stmt2.setTimestamp(3, Timestamp.valueOf(datee));
                stmt2.setTimestamp(4, Timestamp.valueOf(end));
                rs = stmt2.executeQuery();
                if(rs.next()) {
                    return -3;
                 } //izmenio radno vreme
                return 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -25;
    }

    @PostMapping("/add")
    public int postMethodName(@RequestBody Class c) {
        try {
            LocalDateTime start = LocalDateTime.parse(c.getDateAndTimeStart());
            start = start.plusHours(1);
            LocalDateTime end = LocalDateTime.parse(c.getDateAndTimeEnd());
            end = end.plusHours(1);
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Insert into class(idprofessor, idsubject, idstudent, dateAndTimeStart, dateAndTimeEnd, groupClass, topic) values(?,?,?,?,?,?,?)");
            stmt.setInt(1, c.getIdprofessor());
            stmt.setInt(2, c.getIdsubject());
            stmt.setInt(3, c.getIdstudent());
            stmt.setTimestamp(4, Timestamp.valueOf(start));
            stmt.setTimestamp(5, Timestamp.valueOf(end));
            stmt.setBoolean(6, c.isGroupClass());
            stmt.setString(7, c.getTopic());
            if(stmt.executeUpdate()>0) return 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return -1;
    }
    @PostMapping("/addGroup")
    public int addGroup(@RequestBody Class c) {
        try {
            LocalDateTime start = LocalDateTime.parse(c.getDateAndTimeStart());
            start = start.plusHours(1);
            LocalDateTime end = LocalDateTime.parse(c.getDateAndTimeEnd());
            end = end.plusHours(1);
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("Insert into class(idprofessor, idsubject, idstudent, dateAndTimeStart, dateAndTimeEnd, groupClass, topic, status, codeForGroupClass) values(?,?,?,?,?,?,?,?,?)");
            stmt.setInt(1, c.getIdprofessor());
            stmt.setInt(2, c.getIdsubject());
            stmt.setInt(3, c.getIdstudent());
            stmt.setTimestamp(4, Timestamp.valueOf(start));
            stmt.setTimestamp(5, Timestamp.valueOf(end));
            stmt.setBoolean(6, c.isGroupClass());
            stmt.setString(7, c.getTopic());
            stmt.setInt(8, 1);
            stmt.setString(9, c.getCodeForGroupClass());
            if(stmt.executeUpdate()>0) return 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return -1;
    }

    @GetMapping("/pastClasses")
    public List<PastClass> getMethodName(@RequestParam int idStudent) {
        List<PastClass> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM pastclass WHERE idstudent=? ORDER BY dateAndTimeStart DESC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new PastClass(rs.getInt("idpastclass"), rs.getInt("idstudent"), rs.getInt("idprofessor"), rs.getInt("idsubject"), start.format(formatter), end.format(formatter), rs.getString("professorComment"), rs.getString("studentComment"), rs.getInt("studentGrade"), rs.getInt("professorGrade") ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @GetMapping("/incomingClasses")
    public List<Class> incomingClasses(@RequestParam int idStudent) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idstudent=? AND status=1 AND dateAndTimeStart >= NOW() ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }
    @GetMapping("/incomingClassesProf")
    public List<Class> incomingClassesProf(@RequestParam int idStudent) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idprofessor=? AND status=1 AND dateAndTimeStart >= NOW() ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @GetMapping("/requests")
    public List<Class> requestClasses(@RequestParam int idStudent) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idprofessor=? AND status=0 AND dateAndTimeStart >= NOW() ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }
    @GetMapping("/in4hrs")
    public List<Class> in4hrs(@RequestParam int idStudent) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idprofessor=? AND status=1 AND dateAndTimeStart >= NOW() AND dateAndTimeStart <= NOW() + INTERVAL 4 HOUR ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @GetMapping("/in15mins")
    public List<Class> in15mins(@RequestParam int idStudent) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idstudent=? AND status=1 AND dateAndTimeStart >= NOW() AND dateAndTimeStart <= NOW() + INTERVAL 15 MINUTE ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }
    @GetMapping("/in15minsProf")
    public List<Class> in15minsProf(@RequestParam int idStudent) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idprofessor=? AND status=1 AND dateAndTimeStart >= NOW() AND dateAndTimeStart <= NOW() + INTERVAL 15 MINUTE ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idStudent);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                l.add(new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @PostMapping("/cancel")
    public void cancel(@RequestBody Class c) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE class set status=2 where idclass=?");
            stmt.setInt(1, c.getIdclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @PostMapping("/decline")
    public void decline(@RequestBody Class c) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE class set status=3 where idclass=?");
            stmt.setInt(1, c.getIdclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @PostMapping("/accept")
    public void accept(@RequestBody Class c) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE class set status=1 where idclass=?");
            stmt.setInt(1, c.getIdclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    
    @PostMapping("/pastClasses/rateProf")
    public void rateProf(@RequestBody PastClass pc) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE pastclass SET studentGrade=? WHERE idpastclass=?");
            stmt.setInt(1, pc.getStudentGrade());
            stmt.setInt(2, pc.getIdpastclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ;
    }

    @PostMapping("/pastClasses/comment")
    public void comment(@RequestBody PastClass pc) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE pastclass SET studentComment=? WHERE idpastclass=?");
            stmt.setString(1, pc.getStudentComment());
            stmt.setInt(2, pc.getIdpastclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ;
    }

    @PostMapping("/pastClasses/rateStud")
    public void rateStud(@RequestBody PastClass pc) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE pastclass SET professorGrade=? WHERE idpastclass=?");
            stmt.setInt(1, pc.getProfessorGrade());
            stmt.setInt(2, pc.getIdpastclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ;
    }

    @PostMapping("/pastClasses/commentProf")
    public void commentProf(@RequestBody PastClass pc) {
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE pastclass SET professorComment=? WHERE idpastclass=?");
            stmt.setString(1, pc.getProfessorComment());
            stmt.setInt(2, pc.getIdpastclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ;
    }

    @GetMapping("/last7last31days")
    public List<Integer> getMethodName() {
        List<Integer> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT COUNT(*) FROM pastclass WHERE dateAndTimeStart >= NOW() - INTERVAL 7 DAY AND dateAndTimeStart < NOW()");
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                l.add(rs.getInt("COUNT(*)"));
                PreparedStatement stmt1 = conn.prepareStatement("SELECT COUNT(*) FROM pastclass WHERE dateAndTimeStart >= NOW() - INTERVAL 1 MONTH AND dateAndTimeStart < NOW()");
                rs = stmt1.executeQuery();
                if(rs.next()){
                    l.add(rs.getInt("COUNT(*)"));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @GetMapping("/pastClassesForStudentAndProf")
    public List<PastClass> getMethodName(@RequestParam int idp, @RequestParam int ids) {
        List<PastClass> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM pastclass WHERE idprofessor=? and idstudent=?");
            stmt.setInt(1, idp);
            stmt.setInt(2, ids);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                l.add(new PastClass(rs.getInt("idpastclass"), rs.getInt("idstudent"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getString("dateAndTimeStart"), rs.getString("dateAndTimeEnd"), rs.getString("professorComment"), rs.getString("studentComment"), rs.getInt("studentGrade"), rs.getInt("professorGrade")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    @PostMapping("/deleteClass")
    public void deleteClass(@RequestBody Class c) {
        //TODO: process POST request
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM class WHERE idclass=?");
            stmt.setInt(1, c.getIdclass());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/insertPastClass")
    public void insertPastClass(@RequestBody PastClass c) {
        //TODO: process POST request
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime start = LocalDateTime.parse(c.getDateAndTimeStart(), formatter);
            LocalDateTime end = LocalDateTime.parse(c.getDateAndTimeEnd(), formatter);
            String timestampString1 = start.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String timestampString2 = end.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date parsedDate1 = dateFormat.parse(timestampString1);
            Date parsedDate2 = dateFormat.parse(timestampString2);
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO pastclass(idstudent, idprofessor, idsubject, dateAndTimeStart, dateAndTimeEnd) VALUES(?,?,?,?,?)");
            stmt.setInt(1, c.getIdstudent());
            stmt.setInt(2, c.getIdprofessor());
            stmt.setInt(3, c.getIdsubject());
            stmt.setTimestamp(4, new Timestamp(parsedDate1.getTime()));
            stmt.setTimestamp(5, new Timestamp(parsedDate2.getTime()));
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/groupClasses")
    public List<Class> groupClasses(@RequestParam int idProf) {
        List<Class> l = new ArrayList<>();
        try {
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM class WHERE idprofessor=? AND status=1 AND groupClass=1 AND dateAndTimeStart >= NOW() ORDER BY dateAndTimeStart ASC");
            stmt.setInt(1, idProf);
            ResultSet rs = stmt.executeQuery();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (rs.next()) {
                LocalDateTime start = rs.getTimestamp("dateAndTimeStart").toLocalDateTime();
                //start.minusHours(1);
                LocalDateTime end = rs.getTimestamp("dateAndTimeEnd").toLocalDateTime();
                //end.minusHours(1);
                Class c = new Class(rs.getInt("idclass"), rs.getInt("idprofessor"), rs.getInt("idsubject"), rs.getInt("idstudent"), start.format(formatter), end.format(formatter), rs.getBoolean("groupClass"), rs.getString("topic"));
                c.setCodeForGroupClass(rs.getString("codeForGroupClass"));
                l.add(c);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }
    
    
    
}
