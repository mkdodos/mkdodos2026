# 功用
web server
用來託管 build 出來的 dist

在 vite 專案中, npm run build 會產出 dist 資料夾
在 nginx.conf 設定 root 連結到此資料夾
listen : 埠號
```
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

在瀏覽器就可查看
http://localhost:8081

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