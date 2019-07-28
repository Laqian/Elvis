var net = require("net");

var chatServer = net.createServer();

chatServer.on("connection", function(client) {
  console.log("New link at", new Date().toLocaleTimeString());

  client.on("data", function(data) {
    console.log(data.toString()); // 接受来自客户端的信息

    setTimeout(() => {
      client.write("ok");
    }, 10000);
  });

  client.on("error", function(err) {
    console.log(err);
    client.close();
  });
});

chatServer.listen(9000);
