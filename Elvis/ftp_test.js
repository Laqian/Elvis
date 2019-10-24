var PromiseFtp = require("promise-ftp");

var ftp = new PromiseFtp();
ftp
  .connect({ host: "192.168.199.130" })
  .then(function(serverMessage) {
    console.log("Server message: " + serverMessage);
    return ftp.put("test.txt", "/home/test.txt");
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
