const connection = require("./db");

function timeFormatter(value) {
  var da = new Date();

  return (
    da.getFullYear() +
    "-" +
    (da.getMonth() + 1) +
    "-" +
    da.getDate() +
    " " +
    da.getHours() +
    ":" +
    da.getMinutes() +
    ":" +
    da.getSeconds()
  );
}

exports.putUser = async (dbname, firstname, lastname, regoin, email, paper) => {
  let data = await connection.execute(
    "INSERT INTO `asim`.`" +
      dbname +
      "`(`firstname`, `lastname`, `region`, `paper`, `email`) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, regoin, paper, email]
  );
  console.log(data);
  return data;
};

exports.getUser = async () => {
  let data = await connection.execute("SELECT * FROM `asim`.`user`");
  console.log(data);
  return data;
};

exports.getUploadUser = async () => {
  let data = await connection.execute("SELECT * FROM `asim`.`upload`");
  console.log(data);
  return data;
};

exports.deleteUser = async id => {
  let data = await connection.execute(
    "DELETE FROM`asim`.`user` WHERE`id` = ?",
    [id]
  );
  console.log(data);
  return data;
};

exports.deleteUserUpload = async id => {
  let data = await connection.execute(
    "DELETE FROM`asim`.`upload` WHERE`id` = ?",
    [id]
  );
  console.log(data);
  return data;
};

exports.putNews = async (title, hash) => {
  let data = await connection.execute(
    "INSERT INTO `asim`.`news`(`title`, `hash`, `date`) VALUES (?, ?, ?)",
    [title, hash, timeFormatter()]
  );
  console.log(data);
  return data;
};

exports.getNews = async () => {
  let data = await connection.execute("SELECT * FROM `asim`.`news`");
  console.log(data);
  return data;
};

exports.deleteNews = async hash => {
  let data = await connection.execute(
    "DELETE FROM`asim`.`news` WHERE`id` = ?",
    [hash]
  );
  console.log(data);
  return data;
};

exports.putEmail = async address => {
  let data = await connection.execute(
    "INSERT INTO `asim`.`mail`(`address`) VALUES (?)",
    [address]
  );
  console.log(data);
  return data;
};

exports.getEmail = async () => {
  let data = await connection.execute("SELECT * FROM `asim`.`mail`");
  console.log(data);
  return data;
};

exports.deleteEmail = async address => {
  let data = await connection.execute(
    "DELETE FROM`asim`.`mail` WHERE`address` = ?",
    [address]
  );
  console.log(data);
  return data;
};

exports.addFile = async (url, name) => {
  let data = await connection.execute(
    "INSERT INTO `asim`.`file`(`url`,`name`) VALUES (?,?)",
    [url, name]
  );
  console.log(data);
  return data;
};
