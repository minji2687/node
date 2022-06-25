import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 동기
  //   try {
  //     const data = fs.readFileSync("./file.txt");
  //  readFileSync는 동기임
  // file.txt를 열어서 file.txt를 다 읽어야지 그 다음줄로 넘어감,
  //   } catch (error) {
  //     res.status(404).send("File not found ");
  //   }

  //비동기
  fs.readFile("file1.txt", (err, data) => {
    if (err) {
      res.status(404).send("File not found ");
    }
  });
});

app.get("/file2", (req, res) => {
  //promise에서 에러가 낫을 때는 promise 내부에서 에러가 난것이라
  // try catch로 에러를 처리할 수 없다.

  //   try {
  //     fsAsync.readFile("/file.txt");
  //   } catch (error) {
  //     res.status(404).send("File not found");
  //   }
  fsAsync
    .readFile("/file.txt")
    .then((data) => {})
    .catch((error) => res.status(404).send("File not found"));
});

app.get("/file3", async (req, res) => {
  try {
    const data = await fsAsync.readFile("/file.txt");
  } catch (error) {
    res.status(404).send("File not found");
  }
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
