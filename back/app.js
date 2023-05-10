const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); //json 형식 데이터 넘겨주기
app.use(express.urlencoded({ extended: true })); //form 형식 데이터 넘겨주기
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
//내부적으로 에러처리 미들웨어 존재

app.listen(3065, () => {
  console.log("서버실행 중");
});
