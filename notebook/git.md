在 ignore 檔案中有標記 .obsidian , 但還是有部份會在 commit 清單
先切換目錄 `cd /你的repo路徑` (或直接在該資料夾按右鍵開啟命令)
下指令
`git rm -r --cached .obsidian/`
刪除之前有 commit 過的記錄