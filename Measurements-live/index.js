const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const config = require("./config.json");
const mqttServer = require("./models/mqtt");
const utilRouter = require("./router/extra");

const app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
    limit: "50mb"
  })
);
app.use(cookieParser());

app.use(express.static(config.static));

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //项目上线后改成页面的地址
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use("/util", utilRouter);

app.use(function(req, resFile, next) {
  createError(404);
  next();
});

// error handler
app.use(function(err, req, resFile, next) {
  // set locals, only providing error in development
  resFile.locals.message = err.message;
  resFile.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  let status = err.message == "Not Found" ? 404 : 500;
  if (err) console.log(err);
  resFile.status(status);
  resFile.send({
    code: status,
    info: err.message
  });
});

app.listen(config.port);
