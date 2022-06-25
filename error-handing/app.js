import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";
// require("express-async-errors"); //CommonJS module
import {} from "express-async-errors"; //최신 es module

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 동기;
  try {
    const data = fs.readFileSync("./file.txt");
    //  readFileSync는 동기임
    // file.txt를 열어서 file.txt를 다 읽어야지 그 다음줄로 넘어감,
  } catch (error) {
    res.status(404).send("File not found ");
  }

  //비동기
  // fs.readFile("file1.txt", (err, data) => {
  //   if (err) {
  //     res.status(404).send("File not found ");
  //   }
  // });
});

app.get("/file2", (req, res) => {
  //middleware 안에서 promise를 사용한다면 return을 해주어야 한다.
  return fsAsync.readFild("/file.txt");
});

app.get("/file3", async (req, res) => {
  const data = await fsAsync.readFild("/file.txt");
  // async로 감싸면 자동으로 pomise를 리턴하기 떄문에 이렇게 사용하면 마지막 에러처리에 걸리게 된다.
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
  //최종적으로 안전망으로 보류하는 에러처리임
});

app.listen(8080);

//async함수가 리턴하는것은 promise 이다.
//promise 내부에서 발생하는 에러는 프로미스 안에서만 발생하는 에러이므로 catch를 이용해서만 잡을 수 있다.
async function number() {
  return 2;
}
