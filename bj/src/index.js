import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp,InsertReviewController, InsertMissionController, InsertMemberMissionController} from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/api/v1/review", InsertReviewController);

// 가게의 미션 생성하기
app.post("/api/v1/mission", InsertMissionController);

// 가게의 미션을 멤버가 도전 중인 미션에 추가
app.post("/api/v1/member/mission", InsertMemberMissionController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});