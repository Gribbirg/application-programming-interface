const PROTO_PATH = "../todolist.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const TodoListService = grpc.loadPackageDefinition(packageDefinition).TodoListService;
const client = new TodoListService(
    "localhost:50051",
    grpc.credentials.createInsecure(),
);

module.exports = client;