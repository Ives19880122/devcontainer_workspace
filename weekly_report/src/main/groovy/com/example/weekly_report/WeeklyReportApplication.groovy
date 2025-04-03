package com.example.weekly_report

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.CommandLineRunner

@SpringBootApplication
class WeeklyReportApplication implements CommandLineRunner {

    static void main(String[] args) {
        SpringApplication.run(WeeklyReportApplication, args)
    }

    @Override
    void run(String... args) throws Exception {
        if (args.length < 2) {
            println "請提供兩個參數：日期 (yyyy-MM-dd) 和輸出檔案位置"
            return
        }

        String dateInput = args[0]
        String outputPath = args[1]

        // 呼叫 ReportGenerator.groovy 的主邏輯
        ReportGenerator.generateReport(dateInput, outputPath)
    }
}
