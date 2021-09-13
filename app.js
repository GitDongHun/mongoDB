// app.js

// [LOAD PACKAGES]
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
//var router = require("./routes")(app, Book);

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

mongoose.connect("mongodb://localhost/test");

// DEFINE MODEL
//var Book = require("./models/book");

// [RUN SERVER]
var server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
  console.log("http://127.0.0.1/" + port);
});

app.post("/api/books", function (req, res) {
  var Schema = mongoose.Schema;

  var book = new Schema({
    title: String,
    author: String,
    published_date:  {type:Date,default:()=>Date.now()},
  });
  book.title = req.body.name;
  book.author = req.body.author;
  book.published_date=Date.now();

  //   book.save(function (err) {
  //     if (err) {
  //       console.error(err);
  //       res.json({ result: "좋버그가 있습니다." });
  //       return;
  //     }

  res.json({
    result: "(결과)잘 들어왔습니다. 이제 mongoDB에 넣는 함수를 mongoose를 이용해서 넣어주세요",
    name: book.title,
    author: book.author,
    published_date: book.published_date
  });
});
