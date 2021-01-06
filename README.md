# 家庭記帳Web App
一個簡單的家庭記帳Web App。

## 產品功能
- 使用者可以瀏覽所有支出項目。
- 使用者可以新增支出項目。
- 使用者可以編輯支出項目。
- 使用者可以刪除支出項目。


## 環境設置
- express: 4.7.1
- express-handlebars: 5.2.0
- mongoose: 5.11.8
- method-override: 3.0.0
- body-parser: 1.19.0

## 安裝流程

專案資料clone到本地

```
$ git clone https://github.com/ddssads/expense-tracker.git
```
安裝npm

```
$ npm install
```

執行種子資料
```
$ npm run seed
```
終端機顯示代表成功寫入種子資料
```
mongodb connected!
done
```
執行

```
$ npm run dev
```

終端機顯示表示成功執行
```
App is running on http://localhost:3000
mongodb connected!
```