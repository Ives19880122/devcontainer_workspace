package com.example.weekly_report

import java.nio.file.Files
import java.nio.file.Paths
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.time.DayOfWeek
import groovy.text.SimpleTemplateEngine
import java.nio.charset.StandardCharsets
import org.springframework.core.io.ClassPathResource

class ReportGenerator {

    static void generateReport(String dateInput, String outputPath) {
        try {
            // 解析輸入日期
            LocalDate startDate = LocalDate.parse(dateInput, DateTimeFormatter.ofPattern("yyyy-MM-dd"))

            // 確認是否為星期一
            if (startDate.dayOfWeek != DayOfWeek.MONDAY) {
                println "輸入的日期必須是星期一！"
                return
            }

            // 確認輸出資料夾是否存在，若不存在則建立
            Files.createDirectories(Paths.get(outputPath))

            // 計算該週的結束日期 (星期五)
            LocalDate endDate = startDate.plus(4, ChronoUnit.DAYS)

            // 讀取資源模板
            def resource = new ClassPathResource("templates/reportTemplate.md")
            String templateContent = new String(resource.inputStream.bytes, StandardCharsets.UTF_8)

            // 使用 Groovy 的 SimpleTemplateEngine
            def engine = new SimpleTemplateEngine()
            def template = engine.createTemplate(templateContent)



            def formatterFull = DateTimeFormatter.ofPattern("yyyyMMdd")
            def formatterHead = DateTimeFormatter.ofPattern("yyyy/MM/dd")
            def formatterShort = DateTimeFormatter.ofPattern("MM/dd")

            // 準備模板參數
            def binding = [
                dateHead: "${startDate.format(formatterHead)}~${endDate.format(formatterHead)}",
                monday   : startDate.format(formatterShort),
                tuesday  : startDate.plus(1, ChronoUnit.DAYS).format(formatterShort),
                wednesday: startDate.plus(2, ChronoUnit.DAYS).format(formatterShort),
                thursday : startDate.plus(3, ChronoUnit.DAYS).format(formatterShort),
                friday   : endDate.format(formatterShort)
            ]

            // 將參數注入模板
            String reportContent = template.make(binding).toString()

            // 輸出檔案
            String outputFileName = "${startDate.format(formatterFull)}~${endDate.format(formatterFull)}.md"
            Files.write(Paths.get(outputPath, outputFileName), reportContent.bytes)

            println "報告已成功產生：${outputPath}/${outputFileName}"
        } catch (Exception e) {
            println "產生報告時發生錯誤：${e.message}"
        }
    }
}