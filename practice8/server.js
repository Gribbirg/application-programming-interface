const PROTO_PATH = "./todolist.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});
const phonebookProto = grpc.loadPackageDefinition(packageDefinition);
const {v4: uuidv4} = require("uuid");
const server = new grpc.Server();
const todolist = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        desc: "Сходить на пару",
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        desc: "Прогулять на пару",
    },
];
server.addService(phonebookProto.TodoListService.service, {
    getAll: (_, callback) => {
        callback(null, {todoList: todolist});
    },
    get: (call, callback) => {
        let task = todolist.find(n => n.id === call.request.id);
        if (task) {
            callback(null, task);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено"
            });
        }
    },
    insert: (call, callback) => {
        let todoTask = call.request;
        todoTask.id = uuidv4();
        todolist.push(todoTask);
        callback(null, todoTask);
    },
    update: (call, callback) => {
        let existingTask = todolist.find(n => n.id === call.request.id);
        if (existingTask) {
            existingTask.desc = call.request.desc;
            callback(null, existingTask);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено"
            });
        }
    },
    remove: (call, callback) => {
        let existingTaskIndex = todolist.findIndex(
            n => n.id === call.request.id
        );
        if (existingTaskIndex !== -1) {
            todolist.splice(existingTaskIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено"
            });
        }
    }
});
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
    console.log("Сервер запущен по адресу http://127.0.0.1:50051");
    server.start();
});
