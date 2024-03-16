const mongoose = require("mongoose");

const TackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "タスク名を入れてください。"],
        trim: true, // 空白を削除する設定
        maxlength: [20, "タスク名は20文字以内で入力してください"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", TackSchema);