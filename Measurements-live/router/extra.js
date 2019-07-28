const app = require("express").Router();
const fs = require("fs");
const md5 = require("js-md5");
const mailToList = require("../models/mail");
const sendToCos = require("../models/cos");
const sendAs = require("../models/file");

var multer = require("multer");
var upload = multer({
  dest: "upload/",
  limits: {
    fileSize: 1024000
  }
});
app.post("/file", upload.array("file", 12), function(req, res) {
  let result = [];
  req.files.forEach(async Element => {
    console.log(Element);
    result.push(Element.originalname);
    fs.rename(Element.path, Element.destination + Element.originalname, err => {
      if (err) console.log(err);
      sendAs(Element.originalname);
    });
  });

  res.send(result);
});

app.post("/detail", async (req, res) => {
  let id = req.body.hash;
  fs.readFile(`public/${id}.md`, (err, data) => {
    if (err) {
      res.send({
        code: 0,
        info: "NOT FOUND",
        data: ""
      });
    } else {
      res.send({
        code: 1,
        info: "SUCCESS",
        data: data.toString()
      });
    }
  });
});

module.exports = app;
