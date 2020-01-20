const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser"); //로그인을 위함 1
const expressSession = require("express-session"); //로그인을 위함 2
const dotenv = require("dotenv"); //보안을 위해 사용
const passport = require("passport");
const passportConfig = require("./passport");
const db = require("./models");

dotenv.config(); //dotenv 실행(.env파일을 읽어온다)
const app = express();

db.sequelize.sync();
passportConfig();

//app.use는 부가적인 기능을 할 떄 사용. 미들웨어라고도 함
app.use(morgan("dev")); //어떤 요청이 들어왔는지 로그 남김
app.use("/", express.static("uploads")); // static -> 서버가 달라도 자유롭게 사용할 수 있도록 해준다
app.use(express.json()); // JSON 처리
app.use(express.urlencoded({ extended: true })); // 폼으로 넘어온 데이터 처리
app.use(
  cors({
    origin: true, //요청 주소와 같게
    credentials: true // 프론트와 서버가 쿠키 교환이 가능하도록 설정
  })
); //다른 서버끼리 요청, 응답이 가능하도록 해준다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false, // 강제 저장
    saveUninitialized: false, // 빈값도 저장
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, //javascript로 쿠기에 접근하는것을 막음
      secure: false //https 쓸 때는 true
    },
    name: "rnbck"
  })
);
app.use(passport.initialize());
app.use(passport.session()); //passport.session()은 expressSession 동작 완료후 실행된다

// api
app.use("/api/user", require("./api/user")); // 회원정보
app.use("/api/group", require("./api/group")); // 모임정보
app.use("/api/board", require("./api/board")); // 게시판정보
app.use("/api/schedule", require("./api/schedule")); // 일정정보

app.listen(8080, () => {
  console.log("server is running on http://localhost:8080");
});
