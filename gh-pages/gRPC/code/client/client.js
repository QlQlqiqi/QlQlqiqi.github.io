/**
 * 利用 gRPC 与服务器通信
 */

const PROTO_PATH = __dirname + "/library.proto";
const IP = "121.196.168.210";
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

function main() {
  const client = new library_proto.lib(
    IP + ":" + PORT,
    grpc.credentials.createInsecure()
  );
  client.addBook({ id: 13, name: "汉字", author: "QlQl" }, function (err, res) {
    console.log(res);
  });
  client.queryById({ id: 3 }, function (err, res) {
    console.log(res);
  });
  client.queryByName({ name: '汉字' }, function (err, res) {
    console.log(JSON.parse(res.books.toString('utf-8')));
    // console.log(res)
  });
  client.deleteByBookId({ id: "11" }, (err, res) => {
    console.log(res);
  });
}

main();
