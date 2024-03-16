const tasksDOM = document.querySelector(".tasks"); // div要素のtasksを取得し、そこに挿入する
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む 45
const showTasks = async () => {
    try {
        // 自作のAPIを叩く
        const { data: tasks } = await axios.get("/api/v1/tasks");
        // console.log(tasks);

        // タスクが1つもないとき
        if(tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
            return;
        } 

        // タスクを出力　46
        const allTasks = tasks.map((task) => {
            // console.log(task);
            const { completed, _id, name } = task; // 分割代入
            
            return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span><i class="fas fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!-- 編集リンク -->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i> <!-- バージョンによってアイコンの名前も変わる場合があるので注意 -->
                </a>
                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
    })
        .join(""); // 配列にあるカンマの表示を取り除く関数　46
    // console.log(allTasks);
    tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

// タスクを新規作成する 47
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault(); // ページをリロードしないためにeventを取得した
    const name = taskInputDOM.value;

    try {
        await axios.post("/api/v1/tasks", {name: name}); // 取得したデータをname属性につける
        showTasks(); // showTasksでリロード表示 
        taskInputDOM.value = ""; // 送信したらフォームを空にする
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました";
        formAlertDOM.classList.add("text-success"); // 緑色にするスタイルを追加
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。20文字以下でやり直してください。";
    }
    setTimeout(() => { // 3秒後に赤色のアラートが消える設定
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async(event) => {
    const element = event.target;
    console.log(element.parentElement); // .parentElementは親要素を取得
    if(element.parentElement.classList.contains("delete-btn")) { // もしdelete-btnが含まれているなら
        const id = element.parentElement.dataset.id; // idを取得
        // console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`) // 特定のタスクを削除
            showTasks();
        } catch (err) {
            console.log(err);
        }
    } 
});