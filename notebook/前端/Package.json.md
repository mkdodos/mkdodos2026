`homepage` : 決定打包後的 `index.html` 裡 `<script src="...">` 寫出來的網址長怎樣。

- #### 沒有設定（預設值）
打包工具會假設網站是放在**網域的根目錄**


- ####  設定 `"homepage": "/my-app/"` 

打包後的 `index.html` 會自動加上前綴：
`<script src="/my-app/static/js/main.js"></script>`

- #### 設定為相對路徑 `"homepage": "."`
**搬到任何子目錄都能跑**，直接在本地電腦雙擊打開 `index.html` 也能看