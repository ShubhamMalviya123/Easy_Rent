package com.easyrent.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EasyrentBackendApplication {
    public static void main(String[] args) {

        SpringApplication.run(EasyrentBackendApplication.class, args);
        System.out.println("This project is solve the room rent problem with real world");
    }
}
