開啟 vscode 時, 自動啟動專案執行 npm run dev

專案中建立 .vscode 資料夾
建立 tasks.json

```javascript
{
    "version": "2.0.0",
    "tasks": [		
        {
            "type": "npm",
            "script": "dev123",
            "problemMatcher": [],
            "label": "npm: start",
            "detail": "set PORT=5173 && react-scripts dev",
            "runOptions": { "runOn": "folderOpen" }
        }
    ]
}
```