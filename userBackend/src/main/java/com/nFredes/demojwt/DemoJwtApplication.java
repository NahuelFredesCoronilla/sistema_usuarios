package com.nFredes.demojwt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.nFredes.demojwt")
public class DemoJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoJwtApplication.class, args);
	}

}
