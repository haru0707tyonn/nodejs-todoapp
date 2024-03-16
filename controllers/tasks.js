const Task = require("../models/Task"); // スキーマをインポート 33

// 各HTTPメソッドの中身のアルゴリズムを記述する場所
const getAllTasks = async (req, res) => {
    try {
        const allTask = await Task.find({}); // mongooseのドキュメントから　すべてのデータを取得
        res.status(200).json(allTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({ _id: req.params.id }); // findOneで1つのデータを取得する　引数はURLの:idの部分
        if(!getSingleTask) {
            return res.status(404).json(`_id${req.params.id}は存在しません`); // 36 null値を返す場合（文字数が同じで存在しない内容の場合）のエラー表示
        }
        res.status(200).json(getSingleTask);
    } catch (err) {
        res.status(500).json(err);
    }
};
const updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findOneAndUpdate( // findOneAndUpdateで1つのデータを更新する　引数はURLの:idの部分の内容をreq.bodyで更新　37
            { _id: req.params.id }, 
            req.body,
            {
                new: true, // newをtrueにすることで更新された値がjsonで返される（デフォルトはfalse（falseでも更新はされる））
            }
        );
        if(!updateTask) {
            return res.status(404).json(`_id${req.params.id}は存在しません`); // 36 null値を返す場合（文字数が同じで存在しない内容の場合）のエラー表示
        }
        res.status(200).json(updateTask);
    } catch (err) {
        res.status(500).json(err);
    }
};
const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({ _id: req.params.id }); // findOneAndDeleteで1つのデータを削除する　削除するだけでOK　38
        if(!deleteTask) {
            return res.status(404).json(`_id${req.params.id}は存在しません`); // 36 null値を返す場合（文字数が同じで存在しない内容の場合）のエラー表示
        }
        res.status(200).json(deleteTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
};