const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
} = require("../controllers/tasks");

// メソッドが違えば共通の名前（URL）でもOK
router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router; // これをしないと読み込まれない