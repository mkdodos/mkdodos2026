
## 使用 WinSW 開機時啟動 Nginx
1. 下載  [WinSW-x64.exe](https://github.com/winsw/winsw/releases)
將這個 `.exe` 檔案複製到 **Nginx 安裝根目錄**
將它重新命名為 **`nginx-service.exe`**
2. 建立設定檔
在同一個 Nginx 目錄下，建立一個全新的純文字檔案，命名為 **`nginx-service.xml`**（注意：檔名必須跟上面的 exe 一模一樣），並貼上以下內容： 
```xml
<service>
  <id>nginx</id>
  <name>Nginx Service</name>
  <description>High Performance HTTP Server</description>
  <executable>%BASE%\nginx.exe</executable>
  <logpath>%BASE%\logs</logpath>
  <logmode>roll</logmode>
  <startargument>-p</startargument>
  <startargument>%BASE%</startargument>
  <stopprocessarguments>-p</stopprocessarguments>
  <stopprocessarguments>%BASE%</stopprocessarguments>
  <stopprocessarguments>-s</stopprocessarguments>
  <stopprocessarguments>stop</stopprocessarguments>
</service>
```

>**`%BASE%` 代表「目前這個 `.xml` 設定檔與 `.exe` 執行檔所在的絕對路徑」**。

 `nginx-service.exe` 和 `nginx-service.xml` 都在同一目錄
因此，當系統啟動這個服務時，WinSW 會自動把 `%BASE%` 翻譯成該資料夾的絕對路徑：
- 如果你的 Nginx 在 `C:\nginx`，那 `%BASE%` 就等於 `C:\nginx`。    - 
如此就能讀取到 nginx.exe


3. 註冊為 Windows 服務
以**系統管理員身分**開啟 CMD 或 PowerShell。    
使用 `cd` 指令切換到你的 Nginx 目錄（例如：`cd C:\nginx`）。
    
4. 執行以下指令將 Nginx 註冊進系統服務：
`nginx-service.exe install`
  啟動 Nginx 服務
`nginx-service.exe start`

---
# Nginx功用
web server
用來託管 build 出來的 dist

在 vite 專案中, npm run build 會產出 dist 資料夾
在 nginx.conf 設定 root 連結到此資料夾
listen : 埠號
```json
 server {
        listen       8081;
        server_name  localhost;
        location / {
            root   D:\Dev\mkdodos2026\my-project\frontend\dist;
            index  index.html;
            try_files $uri $uri/ /index.html;
        }
    }
```

在瀏覽器就可查看 `http://localhost:8081`


---

## 500 錯誤排除

-檢查 Nginx 是否正在執行

按下 Ctrl + Shift + Esc 打開 工作管理員。
切換到「詳細資料」分頁。
確認是否有兩個 nginx.exe 正在執行（一個是主進程，一個是工作進程）。

-檢查設定檔(conf/nginx.conf)
執行
./nginx.exe -t


-錯誤日誌 (Logs)
打開 logs 資料夾。
使用記事本打開 error.log。
重點： 拉到檔案最下方，查看最新的報錯訊息。500 錯誤的原因通常會寫在裡面。


[error] 18856#7956: *20 rewrite or internal redirection cycle while internally redirecting to "/index.html", client: 127.0.0.1, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "localhost:8081", referrer: "http://localhost:8081/"

上述錯誤代表設定指向的 index.html 不存在,查看設定檔指向的路徑是否正確

`nginx.exe -s reload	修改設定後重新載入 (不中斷服務)`