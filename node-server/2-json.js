const http = require("http");
const fs = require("fs");

const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
  { name: "Frontend" },
];

const server = http.createServer((req, res) => {
  const url = req.url; // what?
  const method = req.method; // how?, action?
  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(courses));
    } else if (method === "POST") {
      const body = [];

      req.on("data", (chunk) => {
        //data라는 이벤트가 발생하면 받은 데이터를 우선 출력
        console.log("chunk", chunk);
        body.push(chunk); // body라는 배열에 추가해준다.
      });

      req.on("end", () => {
        const bodyStr = Buffer.concat(body).toString();
        const course = JSON.parse(bodyStr);
        courses.push(course);
        console.log(course);
        res.writeHead(201); // 나 새로 만들었어! 201!
        res.end();
      });
    }
  }
});

server.listen(8080);
