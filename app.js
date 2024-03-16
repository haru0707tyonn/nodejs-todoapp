const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks"); // moduleをインポート
const connectDB = require("./db/connect");
require("dotenv").config(); // これを記述しないと.envファイルを読み込めない npm i dotenv
app.use(express.json()); // json形式を使うという設定

app.use(express.static("./public")); // 40 これを記述するとindex.htmlが出力される

const PORT = 5000;

// ルーティング設定
app.use("/api/v1/tasks", taskRoute); // 共通する部分を第一引数に 26 他の部分だけを変えればいい

// データベースと接続 　　非同期処理で行う 30
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL); // .envファイル内を見る記述
        app.listen(PORT, console.log("サーバーが起動しました"));
    } catch (err) {
        console.log(err);
    }
};

start();
