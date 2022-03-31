/**
 * 利用 gRPC 中间件搭建简易图书管理系统
 */

const PROTO_PATH = __dirname + "/../library.proto";
const { addBook, queryById, queryByName, deleteByBookId } = require("./lib");
const IP = "localhost";
const PORT = 10029;

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const library_proto = grpc.loadPackageDefinition(packageDefinition).library;

function addBookCall(call, callback) {
  try {
    addBook(call.request).then((result) => {
      callback(null, { result });
    });
  } catch (err) {
    callback(null, { result: false });
  }
}

function queryByIdCall(call, callback) {
  queryById(call.request).then((res) => {
    // console.log(res)
    callback(null, { ...res });
  });
}
function queryByNameCall(call, callback) {
  queryByName(call.request).then((res) => {
    callback(null, { books: Buffer.from(JSON.stringify(res), "utf-8") });
  });
}
function deleteByBookIdCall(call, callback) {
  deleteByBookId(call.request).then((res) => {
    callback(null, { books: res });
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(library_proto.lib.service, {
    addBook: addBookCall,
    queryById: queryByIdCall,
    queryByName: queryByNameCall,
    deleteByBookId: deleteByBookIdCall,
  });
  server.bindAsync(
    IP + ":" + PORT,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}
main();
