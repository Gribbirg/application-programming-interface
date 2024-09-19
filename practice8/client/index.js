const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get("/", (req, res) => {
    client.getAll(null, (err, data) => {
        if (!err) {
            res.render("todolist", {
                results: data.todoList
            });
        }
    });
});
app.post("/save", (req, res) => {
    let newTask = {
        desc: req.body.desc,
    };
    client.insert(newTask, (err, data) => {
        if (err) throw err;
        console.log("Дело создано", data);
        res.redirect("/");
    });
});
app.post("/update", (req, res) => {
    const updateTask = {
        id: req.body.id,
        desc: req.body.desc,
    };
    client.update(updateTask, (err, data) => {
        if (err) throw err;
        console.log("Дело успешно обновлено", data);
        res.redirect("/");
    });
});
app.post("/remove", (req, res) => {
    client.remove({id: req.body.task_id}, (err, _) => {
        if (err) throw err;
        console.log("Дело удалено");
        res.redirect("/");
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Сервер запущен на порту %d", PORT);
});
