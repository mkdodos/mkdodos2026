
產生文件
```javascript
	import { jsPDF } from "jspdf";
	import font from "./fonts/ms";
 // 列印方向(預設橫向)
    let direction = "l"; // p:直向 l:橫向
    var doc = new jsPDF(direction, "mm"); // l
    doc.setFontSize(12);
    // 中文字型
    // 1. 把 Base64 檔案塞進 jsPDF 的虛擬檔案系統（VFS），這時取個檔名
    doc.addFileToVFS("name-for-addFont-use", font);
    // 2. 註冊字型：指定剛剛在 VFS 裡的檔名，並賦予它一個「字型標籤 (Font Family)」 // 語法：doc.addFont("VFS裡的檔名", "你自訂的字型標籤", "字體樣式");
    doc.addFont("name-for-addFont-use", "CustomChinese", "normal");
    // 3. 設定接下來的文字要使用這個字型標籤
    doc.setFont("CustomChinese");
    // 寫入文字：text("文字內容", X軸座標, Y軸座標)
    doc.text("Hello 中!", 10, 10);
    doc.save("Demo.pdf");
```

[製作中文字型](https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html)
上傳ttf
將 `.ttf` 檔案轉換為 **Base64** 編碼字串