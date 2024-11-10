import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  handleUserSignUp,
  handleAddUserMission,
  handleUserReviewList,
  handleUserOngoingMissionList,
  handleUserMissionComplete
} from "./controllers.js/user.controllers.js";
import {
  handleStoreAdd,
  handleStoreMissionAdd,
  handleStoreReviewAdd,
  handleStoreReviewsList,
  handleStoreMissionsList
} from "./controllers.js/store.controllers.js";

BigInt.prototype.toJSON = function () { // bigint 호환
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.post("/api/v1/users", handleUserSignUp);
app.post("/api/v1/users/stores/missions", handleAddUserMission);

app.post("/api/v1/stores", handleStoreAdd);
app.post("/api/v1/users/stores/reviews", handleStoreReviewAdd);
app.post("/api/v1/stores/missions", handleStoreMissionAdd);

app.get("/api/v1/users/:memberId/stores/reviews", handleUserReviewList);
app.get("/api/v1/users/:memberId/missions/ongoing", handleUserOngoingMissionList);
app.patch("/api/v1/users/:memberId/missions/:missionId/complete", handleUserMissionComplete);

app.get("/api/v1/stores/:storeId/reviews", handleStoreReviewsList);
app.get("/api/v1/stores/:storeId/missions", handleStoreMissionsList);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

