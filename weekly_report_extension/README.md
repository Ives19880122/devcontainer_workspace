# Weekly Report Extension

這是一個用於生成每週報告的 VS Code 擴充套件，提供高效的報告生成功能。

## 功能

- **自動化報告生成**：透過簡單的指令快速生成每週報告。
- **可自訂模板**：使用預設模板或自訂自己的模板。

## 系統需求

使用此擴充套件前，請確保已安裝以下依賴項：

- **Node.js**：已預先安裝於開發容器中。
- **npm**：已預先安裝於開發容器中。

請確保這些依賴項已正確安裝並配置。

## 擴充套件設定

此擴充套件提供以下設定：

- `weeklyReport.enable`：啟用或停用擴充套件。
- `weeklyReport.outputPath`：指定生成報告的輸出路徑。

## 已知問題

- **檔案路徑錯誤**：請確保 `weekly_report.mustache` 檔案位於 `resources` 資料夾中。
- **相容性**：此擴充套件已在 VS Code 版本 1.99.0 及以上進行測試。

## 發行記錄

### 1.0.0

- 初始版本發佈。
- 新增自動化報告生成功能。

---

## 遵循擴充套件指南

請確保您已閱讀擴充套件指南，並遵循最佳實踐來創建擴充套件。

- [擴充套件指南](https://code.visualstudio.com/api/references/extension-guidelines)

## 使用 Markdown

您可以使用 Visual Studio Code 撰寫此 README。以下是一些有用的編輯器快捷鍵：

- 切換預覽模式（macOS：`Shift+Cmd+V`，Windows 和 Linux：`Shift+Ctrl+V`）。
- 按下 `Ctrl+Space`（Windows、Linux、macOS）以查看 Markdown 片段清單。

## 更多資訊

- [Visual Studio Code 的 Markdown 支援](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown 語法參考](https://help.github.com/articles/markdown-basics/)

**享受使用 Weekly Report Extension 的樂趣！**
