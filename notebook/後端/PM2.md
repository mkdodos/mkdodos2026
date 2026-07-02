# 功能

**行程管理工具**（Process Manager）, 用於正式環境（production）部署，讓 Node/Express 應用能夠穩定、持續運行。
#### 1. 行程守護（Process Daemon）
- 應用程式崩潰時會**自動重啟**，避免服務中斷
- 可設定重啟次數上限，避免無限崩潰迴圈（crash loop）
#### 2. 背景執行
- 讓 Node 應用在背景持續運行，不需要一直開著終端機視窗
- 關閉 SSH 連線後應用仍會繼續執行


# 開機自動啟動

1. 啟動專案（例如：啟動 Express 服務）
`pm2 start app.js --name "my-app"`

 2. 儲存目前 PM2 的運行清單與狀態
`pm2 save`

> 使用 套件 pm2-windows-startup
- 安裝：`npm install -g pm2-windows-startup`    
安裝完 pm2-windows-startup,就能使用此套件提供的pm2-startup install這個指令註冊 windows 服務

>- 註冊服務：`pm2-startup install`    
- 將 PM2 註冊進 Windows 開機啟動服務中
此註冊動作只需做一次,之後有其他專案要加入,只需做 pm2 start , pm2 save

>取消服務：`pm2-startup uninstall`

# QA
忘記 start 內容,可先用 `pm2 list` 查看目前已啟動的服務名稱, 再用 
pm2 describe <專案名稱或ID>
查看指定專案的詳細環境設定





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
- 查看服務內容 : `pm2 info my-node-app`

無法直接重新命名,需刪除服務,再建立新服務
```
pm2 delete my-node-app
pm2 start app.js --name "新名稱"
pm2 save
```
