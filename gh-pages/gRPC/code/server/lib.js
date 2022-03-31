const fs = require("fs");
const FILE_PATH = __dirname + "/books.json";
const ENCODING = "utf-8";
// 最多保存 100 本书
const LIMIT_MAX = 100;

const { getSLock, releaseSLock, getXLock, releaseXLock } = require("./util");

const buf = Buffer.alloc(1024);

// 返回“数据库”中的数据
function getBooks(filePath = FILE_PATH, encoding = ENCODING) {
  return new Promise((resolve, reject) => {
    fs.open(FILE_PATH, "r", (err, fd) => {
      fs.read(fd, buf, 0, buf.byteLength, 0, (err, bytes) => {
        resolve(JSON.parse(buf.slice(0, bytes).toString(encoding)));
      });
    });
  });
}

// 保存数据到“数据库”
function saveBooks(data, filePath = FILE_PATH, encoding = ENCODING) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      Buffer.from(JSON.stringify(data), "utf-8"),
      { encoding, flag: "w" },
      () => {
        resolve();
      }
    );
  });
}

/**
 * 添加一本书
 * @param {Object} book 包含 Book 类的属性
 * @return {Promise} 返回操作是否成功
 */
function addBook({ id, name, author }) {
  return new Promise((resolve, reject) => {
    getXLock("addBook").then(() => {
      getBooks().then((books) => {
        if (books.length >= LIMIT_MAX) reject(false);
        books[id] = { name, author };
        saveBooks(books).then(() => {
          releaseXLock("addBook");
          resolve(true);
        });
      });
    });
  });
}

/**
 * 通过 ID 查找书，如果不存在，返回 null
 * @param {Object} book Book 类
 * @return {Promise}} 返回对应 Book 类型书
 */
function queryById({ id }) {
  return new Promise((resolve, reject) => {
    getSLock("queryById").then(() => {
      getBooks().then((books) => {
        releaseSLock("queryById");
        resolve(books[id] || null);
      });
    });
  });
}

/**
 * 通过 name 查找书，返回书的数组
 * @param {Object} book Book 类
 * @return {Promise}}
 */
function queryByName({ name }) {
  const reg = new RegExp(name.split("").join("*"));
  return new Promise((resolve, reject) => {
    getSLock("queryByName").then(() => {
      getBooks().then((books) => {
        releaseSLock("queryByName");
        const res = [];
        let book = null;
        for (const key in books) {
          book = books[key];
          if (book.name.match(reg)) res.push(book);
        }
        resolve(res);
      });
    });
  });
}

/**
 * 通过 ID 删除书
 * @param {Object} book Book 类
 * @return {Promise}}
 */
function deleteByBookId({ id }) {
  return new Promise((resolve, reject) => {
    getXLock("deleteByBookId").then(() => {
      getBooks().then((books) => {
        delete books[id];
        saveBooks(books).then(() => {
          releaseXLock("deleteByBookId");
          resolve(true);
        });
      });
    });
  });
}

module.exports = {
  addBook,
  queryById,
  queryByName,
  deleteByBookId,
};
