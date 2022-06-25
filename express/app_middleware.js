import express from "express";

const app = express();

// app.get("/sky/:id", (req, res, next) => {
//   console.log(req.path);
//   console.log(req.headers);
//   console.log(req.params.id);
//   console.log(req.query.keyword);

//   res.setHeader("key", "value");
//   res.status(201).send("created");
// });

app.all("/api", (req, res, next) => {
  console.log("all"); //post, get, delete, 으로 보내든 모든 http 리퀘스트가 동작한다
  // /api 경로 한해서만 처리가 된다
  // /api/* 이렇게 명확하게 등록을 해야 use메소드와 똑같이 동작을 한다.
  next();
});

app.use("/sky", (req, res, next) => {
  console.log("use");
  // /sky를 포함한 어떤 경로에 대해서든 이 미들웨어를 등록하고 싶을 떄 사용
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("first");
    // next(new Error("error"));
    if (true) {
      return res.send("hello");
    }
    // 처음으로 send를 한사람이 이긴다.
  },
  (req, res, next) => {
    console.log("first2");
    next();
  }
);

// 미들웨어에서는 response를 하거나 next를 호출해야 한다.
// 흐름이 이어지게 만들어야 한다

app.get("/", (req, res, next) => {
  console.log("second");
});

app.use((req, res, next) => {
  res.status(404).send("Not available!");
});

app.use((error) => {
  console.error(error);
  res.status(500).send("Sorry! try later");
});

app.listen(8080);
