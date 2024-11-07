import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp,InsertStoreController, InsertReviewController, InsertMissionController, InsertMemberMissionController ,handleListStoreReviews} from "./controllers/user.controller.js";

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

//회원 가입 api
app.post("/api/v1/users/signup", handleUserSignUp);

// 가게 생성 api
app.post("/api/v1/store", InsertStoreController);

//리뷰 생성 api
app.post("/api/v1/review", InsertReviewController);

// 가게의 미션 생성하기
app.post("/api/v1/mission", InsertMissionController);

// 가게의 미션을 멤버가 도전 중인 미션에 추가 api
app.post("/api/v1/member/mission", InsertMemberMissionController);

// 가게에 속한 모든 리뷰를 조회 하는 api 
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});