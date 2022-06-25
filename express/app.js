import express from "express";

const app = express();

app.use(express.json());

app
  .route("/posts")
  .get((req, res, next) => {
    res.status(201).send("GET: /posts");
  })
  .post("/posts", (req, res) => {
    res.status(201).send("POST:/posts");
  });
//chaining이 가능하고 등록할때 더이상 경로를 필요없다.

app
  .route("/posts/:id")
  .put((req, res) => {
    res.status(201).send("PUT: /post/:id");
  })
  .delete((req, res) => {
    res.status(201).send("DELETE: /posts/id");
  });

app.listen(8080);
