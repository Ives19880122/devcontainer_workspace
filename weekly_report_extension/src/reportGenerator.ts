import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';
import { addDays, format, isMonday } from 'date-fns';

async function generateReport(context: vscode.ExtensionContext, dateInput: string, outputPath: string) {
    
    const outputChannel = vscode.window.createOutputChannel('Weekly Report Logs');

    // 獲取 Template 檔案的路徑
    const templatePath = path.join(context.extensionPath, 'resources', 'weekly_report.mustache');
    outputChannel.appendLine(`模板檔案路徑：${templatePath}`);
    
    // 檢查 Template 檔案是否存在
    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(templatePath));
        outputChannel.appendLine('模板檔案存在，開始讀取...');
    } catch {
        const errorMessage = `找不到 Template 檔案：${templatePath}`;
        outputChannel.appendLine(errorMessage);
        vscode.window.showErrorMessage(errorMessage);
        return;
    }

    try {

        // 讀取 Template 檔案
        const template = fs.readFileSync(templatePath, {encoding: 'utf-8'});
        outputChannel.appendLine('模板檔案已成功讀取。');
        outputChannel.appendLine(template);


        // 解析輸入的日期並生成模板參數
        const data = getParams(dateInput);
        outputChannel.appendLine('模板參數已生成：');
        outputChannel.appendLine(JSON.stringify(data, null, 2));

        // 渲染模板
        const mustache = require('mustache');
        const output = mustache.render(template, data);
        outputChannel.appendLine('模板已渲染:');
        outputChannel.appendLine(output);

        // 確定輸出檔案的路徑
        const outputFilePath = `${outputPath}/${data.startDate}~${data.endDate}.md`;
        outputChannel.appendLine(`輸出檔案路徑：${outputFilePath}`);


        // 寫入渲染結果到檔案
        fs.writeFileSync(outputFilePath, output);
        outputChannel.appendLine('報告已成功寫入檔案。');


        vscode.window.showInformationMessage(`報告已成功生成！\n檔案路徑：${outputFilePath}`);
    } catch (error) {
        const errorMessage = `生成報告時發生錯誤：${error instanceof Error ? error.message : String(error)}`;
        outputChannel.appendLine(errorMessage);
        vscode.window.showErrorMessage(errorMessage);
    }
}

function getParams(dateInput: string) : ReportData{
    const startDate = new Date(dateInput);

    // 確認輸入的日期是否為星期一
    if (!isMonday(startDate)) {
        throw new Error('輸入的日期必須是星期一！');
    }

     // 計算該週的結束日期 (星期五)
     const endDate = addDays(startDate, 4);

    // 準備模板參數
    return {
        "startDate": format(startDate, 'yyyy-MM-dd'),
        "endDate": format(endDate, 'yyyy-MM-dd'),
        "monday": format(startDate, 'yyyy-MM-dd'),
        "tuesday": format(addDays(startDate, 1), 'yyyy-MM-dd'),
        "wednesday": format(addDays(startDate, 2), 'yyyy-MM-dd'),
        "thursday": format(addDays(startDate, 3), 'yyyy-MM-dd'),
        "friday": format(endDate, 'yyyy-MM-dd')
    };
}

interface ReportData {
    startDate: string;
    endDate: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
}

export default generateReport;