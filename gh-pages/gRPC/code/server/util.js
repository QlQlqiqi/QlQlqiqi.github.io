/**
 * 互斥锁和共享锁，防止并发造成的数据错误
 */

// 数据库唯一互斥锁和共享锁
let SLock = {},
  XLock = {};

/**
 * 获取共享锁
 * @param {String} ID 调用者的唯一标识量
 * @return {Promise}
 */
function getSLock(ID) {
  return new Promise((resolve, reject) => {
    let timeId = setInterval(() => {
      const len = Object.keys(XLock).length;
      if (!len || (len === 1 && XLock[ID])) {
        SLock[ID] = true;
        clearInterval(timeId);
        resolve();
      }
    }, 100);
  });
}

/**
 * 释放共享锁
 * @param {String} ID 调用者的唯一标识量
 * @return {void}
 */
function releaseSLock(ID) {
  delete SLock[ID];
}

/**
 * 获取互斥锁
 * @param {String} ID 调用者的唯一标识量
 * @return {Promise}
 */
function getXLock(ID) {
  return new Promise((resolve, reject) => {
    let timeId = setInterval(() => {
      const lenX = Object.keys(XLock).length;
      const lenS = Object.keys(SLock).length;
      if (
        (!lenX && !lenS) ||
        (!lenX && lenS === 1 && SLock[ID]) ||
        (lenX === 1 && XLock[ID])
      ) {
        XLock[ID] = true;
        // console.log("getX", ID);
        clearInterval(timeId);
        resolve();
      }
    }, 100);
  });
}

/**
 * 释放互斥锁
 * @param {String} ID 调用者的唯一标识量
 * @return {void}
 */
function releaseXLock(ID) {
  // console.log("releaseX", ID);
  delete XLock[ID];
}

module.exports = {
  getSLock,
  releaseSLock,
  getXLock,
  releaseXLock,
}