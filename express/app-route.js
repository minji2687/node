import express from "express";
import postRouter from "./router/post.js";
import userRouter from "./router/user.js";

const app = express();

app.use(express.json()); //REST API, Body를 parsing할 때 사용
app.use(express.urlencoded({ extended: false })); //body를 자동으로 parsing을 해주지만
// HTML Form -> Body

const options = {
  dotfiles: "ignore",
  etag: false,
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};
app.use(express.static("public", options)); // pulic 안에 있는 리소스를 사용자가 읽어갈 수 있도록 설정 할 수 있다.

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(8080);
