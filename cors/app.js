import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(helmet());

// helmet은 보안에 대한 추가적인 헤더를 요청에 추가해준다
// X-Content-Type-Options: nosniff
// X-DNS-Prefetch-Control: off
// X-Download-Options: noopen
// X-Frame-Options: SAMEORIGIN
// X-Permitted-Cross-Domain-Policies: none
// X-XSS-Protection: 0

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE" );
//   //header의 이름을 정확하게 알고 있어야 한다는 단점이 있음.
//   어떤 주소에서 요청이 와도, 서버의 응답을 다 표기 할 수 있다.
//   우리가 배포한 클라이언트에서만 데이터를 보여줄 수 있도록 설정하는것이 더 좋다
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  //header의 이름을 정확하게 알고 있어야 한다는 단점이 있음.
  next();
});

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    // 이 도메인에서만 cors 정책을 허용할 수 있도록 할 수 있다.
    optionsSuccessStatus: 200,
    credentials: true, // Access-control-Allow-Credentials:true
    //헤더에 사용자의 토큰이나 인증정보를 허용하려면 이것을 추가하면 된다.
  })
);

app.get("/", (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  console.log(req.cookies.yummy_cookie);
  req.cookies.yummy_cookie;
  res.send("welcome");
});

app.listen(8080);
