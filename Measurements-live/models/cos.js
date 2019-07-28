// 引入模块
const COS = require("cos-nodejs-sdk-v5");
const config = require("../config.json");
const fs = require("fs");
// 创建实例
const cos = new COS({
  SecretId: config.cos.SecretId,
  SecretKey: config.cos.SecretKey
});

function setting(name, path) {
  let settings = config.cos.setting;
  settings.Key = name;
  (settings.Body = fs.readFileSync("upload/" + path)),
    (setting.onProgress = function(progressData) {
      console.log(progressData);
    });
  return settings;
}

module.exports = function(
  paths,
  callback = data => {
    console.log(data);
  }
) {
  paths.forEach(element => {
    cos.putObject(setting(element, element), (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(data);
      }
    });
  });
};
