package com.example.backend.db;
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class DB {
    @Bean
    public static DataSource source(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/mojnajzdrazinastavnik");
        dataSource.setUsername("root");
        dataSource.setPassword("");

        return dataSource;
    }
}
