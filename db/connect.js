// mongooseでNode.jsとMongodbを接続 nom i mongoose 30
const mongoose =require("mongoose");

const connectDB = (url) => {
    return mongoose
    .connect(url) // 引数のURLはapp.jsでMongodbのサイトのを使用
    .then(() => console.log("データベースと接続中・・・")) // .thenは非同期処理、connectが完了した後に実行される
    .catch((err) => console.log(err));
};

module.exports = connectDB; // app.jsで使えるように