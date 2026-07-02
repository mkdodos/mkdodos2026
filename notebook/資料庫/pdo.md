```
$sql =  "INSERT INTO $table

          ( 日期,姓名,假別,時數,說明) values

          ( '$obj->offDate','$obj->empName','$obj->offType',

            '$obj->offHours','$obj->offNote'

          ) ";
```

若有欄位值為空白,會出現錯誤,無法新增