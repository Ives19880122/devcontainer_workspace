import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('weeklyReport.generateReport', async () => {
        try {
            // 提示使用者輸入日期
            const dateInput = await vscode.window.showInputBox({
                prompt: '請輸入日期 (格式: yyyy-MM-dd)',
                validateInput: (value) => {
                    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : '請輸入有效的日期格式 (yyyy-MM-dd)';
                }
            });

            if (!dateInput) {
                vscode.window.showErrorMessage('日期輸入無效或已取消');
                return;
            }

            // 提示使用者輸入輸出路徑
            const outputPath = await vscode.window.showInputBox({
                prompt: '請輸入輸出路徑 (絕對路徑)',
                value: path.join(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '', 'output'),
                validateInput: (value) => {
                    return value ? null : '請輸入有效的路徑';
                }
            });

            if (!outputPath) {
                vscode.window.showErrorMessage('輸出路徑輸入無效或已取消');
                return;
            }

            // 獲取 JAR 檔案的路徑
            const jarPath = path.join(context.extensionPath, 'resources', 'weekly_report.jar');

            // 檢查 JAR 檔案是否存在
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(jarPath));
            } catch {
                vscode.window.showErrorMessage(`找不到 JAR 檔案：${jarPath}`);
                return;
            }

            // 執行 JAR 檔案
            const command = `java -jar "${jarPath}" "${dateInput}" "${outputPath}"`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`執行失敗：${stderr}`);
                    return;
                }
                vscode.window.showInformationMessage(`報告已成功生成！\n${stdout}`);
            });
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : String(error);
            vscode.window.showErrorMessage(`發生錯誤：${errorMessage}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}