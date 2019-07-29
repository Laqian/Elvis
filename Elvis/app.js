const mqtt = require("mqtt");
const config = require("./config.json");
const PromiseFtp = require("promise-ftp");
const fs = require("fs");

const client = mqtt.connect(`mqtt://${config.mhost}:${config.mport}`);

const socketClient = new require("net").Socket();

const controller = {
  queue: new Array(),
  lock: false,
  lockoff: function() {
    this.lock = false;
  },
  lockon: function() {
    this.lock = true;
  }
};

client.on("connect", function() {
  console.log(`MQTT:connect to ${config.mhost}:${config.mport}`);
  client.subscribe("pushFile", {
    qos: 1
  });
  client.subscribe("test");
});
client.on("error", function(e) {
  console.log(e);
});

client.on("message", function(top, message) {
  message = JSON.parse(message);
  switch (top) {
    //存储web服务器发送的文件
    case "pushFile":
      //本地模式运行
      saveAs(message.name, message.content.data);

      break;
    default:
      console.log(message.toString());
      break;
  }
});

function saveAs(name, content) {
  fs.writeFileSync(`./source/${name}`, new Buffer(content));

  var ftp = new PromiseFtp();
  ftp
    .connect({ host: "192.168.0.11" })
    .then(function(serverMessage) {
      console.log("Server message: " + serverMessage);
      return ftp.put(
        `./source/${name}`, //本地source文件下的目录
        `/natinst/LabVIEW Data/bitfile.rpd` //Elvis的labVIEW Data的目录
      );
    })
    .then(function() {
      addWait(name);
      return ftp.end();
    });
}

function addWait(file) {
  controller.queue.push(file);
}

// function burnExec(fileName, callback) {
//   socketClient.connect(6678, "192.168.199.130", function() {
//     socketClient.write("1");
//     // socketClient.write("start" + fileName);
//   });

//   let exec = function(data) {
//     console.log("from server: " + data);
//     if (data === "Completed!") {
//       callback();
//       socketClient.removeListener("data", exec);
//       socketClient.destroy(); // 完全关闭连接
//     } else if (data === "Session Starts!") {
//     }
//     //得到服务端返回来的数据
//   };

//   socketClient.on("data", exec);
// }

socketClient.connect(6678, "192.168.0.11", function() {
  // socketClient.write("start" + fileName);
});

socketClient.on("data", data => {
  console.log(data.toString().length);
  if (data.toString().length === 14) {
    controller.queue.shift();
    //   controller.lock = controller.length === 0 ? false : true;
    controller.lockoff();
    console.log(controller);
  }
});

setInterval(async () => {
  // console.log(controller);
  if (controller.lock === false && controller.queue.length > 0) {
    controller.lockon();
    // let element = controller.queue[0];
    // burnExec(element, () => {
    //   controller.queue.shift();
    //   //   controller.lock = controller.length === 0 ? false : true;
    //   controller.lockoff();
    // });
    socketClient.write("1");
  }
}, 1000);
