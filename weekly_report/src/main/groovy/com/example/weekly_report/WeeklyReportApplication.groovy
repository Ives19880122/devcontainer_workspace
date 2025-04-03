package com.example.weekly_report

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class WeeklyReportApplication implements CommandLineRunner {

	static void main(String[] args) {
		SpringApplication.run(WeeklyReportApplication, args)
	}

	@Override
	void run(String... args) throws Exception {
		println "Weekly Report Application is running!"
	}

}
