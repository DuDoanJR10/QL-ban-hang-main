require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./router");

const methodOverride = require("method-override");
// const cookieParser = require('cookie-parser');
const http = require("http");

var server = http.createServer(app);

var request = require("request");

// config cors
var cors = require("cors");
app.use(cors());

// Connect MongoDB
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://quanlybanhang:quanlybanhang@quanlybanhang.vxijvop.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Connect Thanh Cong");
  })

  .catch((err) => {
    console.log(err);
  });

//Cấu hình phương thức GET, POST, PUT, PATCH
app.use(methodOverride("_method"));

// Xử lý khi đường dẫn là file tĩnh thì sẽ lao vào public
app.use(express.static(path.join(__dirname, "uploads")));

//Lấy dữ liệu từ POST
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Router init
router(app);

//Localhost 3000
app.listen(PORT, console.log(`Localhost: ${PORT}`));
