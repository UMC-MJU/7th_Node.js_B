import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
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
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { naverStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";



BigInt.prototype.toJSON = function () { // bigint 호환
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};


dotenv.config();

passport.use(googleStrategy);  // passport 라이브러리에 정의한 로그인 방식을 등록하는코드
passport.use(naverStrategy);

passport.serializeUser((user, done) => done(null, user)); // session에 사용자 정보를 저장할 때 사용하는 함수
passport.deserializeUser((user, done) => done(null, user)); // session의 정보를 가져올 때 사용하는 함수

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

//구글 로그인 경로
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

//네이버 로그인 경로
app.get("/oauth2/login/naver", passport.authenticate("naver"));
app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/oauth2/login/naver", // 인증 실패 시 리다이렉트 경로
    failureMessage: true, // 인증 실패 메시지 활성화
  }),
  (req, res) => {
    // 인증 성공 시 리다이렉트
    res.redirect("/");
  }
);



app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("Hello World!");
  console.log(req.user);
});



app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };
  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };
  next();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.member);
});


app.post("/api/v1/users", handleUserSignUp);
app.post("/api/v1/users/stores/missions", handleAddUserMission);
app.get("/api/v1/users/:memberId/stores/reviews", handleUserReviewList);
app.get("/api/v1/users/:memberId/missions/ongoing", handleUserOngoingMissionList);
app.patch("/api/v1/users/:memberId/missions/:missionId/complete", handleUserMissionComplete);


app.post("/api/v1/stores", handleStoreAdd);
app.post("/api/v1/stores/missions", handleStoreMissionAdd);
app.post("/api/v1/users/stores/reviews", handleStoreReviewAdd);
app.get("/api/v1/stores/:storeId/reviews", handleStoreReviewsList);
app.get("/api/v1/stores/:storeId/missions", handleStoreMissionsList);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */

/*
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

