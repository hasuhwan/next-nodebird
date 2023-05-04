const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json()); //json 형식 데이터 넘겨주기
app.use(express.urlencoded({ extended: true })); //form 형식 데이터 넘겨주기

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/user", userRouter);
app.listen(3065, () => {
  console.log("서버실행 중");
});
