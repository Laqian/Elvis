//可以node ftp.js来检测是否能将文件上传至Elvis的文件夹

var PromiseFtp = require("promise-ftp");

var ftp = new PromiseFtp();
ftp
  .connect({ host: "192.168.0.11" })
  .then(function(serverMessage) {
    console.log("Server message: " + serverMessage);
    return ftp.put("test.txt", "/home/test.txt");  //设置传送的文件和目标文件夹的文件
  })
  .then(function() {
    return ftp.list("/home");
  })
  .then(function(list) {
    console.log("Directory listing:");
    console.log(list);
    return ftp.end();
  });

exports.default();
