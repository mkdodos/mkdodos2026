全域安裝
`npm install pm2 -g`

1. 進到專案目錄，啟動程式
`pm2 start app.js --name "my-node-app"`
`--name` "自訂這個背景處理程序的名稱"

2. 設定開機自動啟動 (Linux 系統)
`pm2 startup`

PM2 的 `startup` 指令運作邏輯是：
1. 偵測作業系統。    
2. 尋找作業系統內建的系統守護進程（Init System）。    
3. 產生對應的啟動腳本。  

因為 Windows 的後台管理機制叫做 **「Windows 服務 (Windows Services)」**，這套機制與 Linux 完全不同，PM2 官方程式碼沒有內建這套轉換邏輯，所以才會回報「找不到初始化系統（Init system not found）」。
pm2-windows-startup 是一個「適配器」。它跳過了官方的偵測機制，直接動手把 PM2 的路徑寫進 Windows 的啟動清單裡。

>在 windows 使用  pm2 startup 改用套件 pm2-windows-startup
- 安裝：`npm install -g pm2-windows-startup`    
- 註冊服務：`pm2-startup install`    
- 取消服務：`pm2-startup uninstall`

3. 儲存
`pm2 save`

>註冊 Windows 服務只需剛開始做一次
>之後再有其它專案要執行,只需做 1 3 步即可
>`pm2 start app.js --name "名稱"`
 `pm2 save`

**常用 PM2 指令：**
- 查看狀態：`pm2 list`    
- 停止程式：`pm2 stop my-node-app`    
- 重啟程式：`pm2 restart my-node-app`    
- 查看日誌：`pm2 logs`