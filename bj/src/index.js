import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUserSignUp,
  UpdateMemberInfoController,
  InsertStoreController, 
  InsertReviewController, 
  InsertMissionController, 
  InsertMemberMissionController, 
  GetListStoreReviewsController, 
  GetListStoreMissionController,
  GetListMemberReviewsController,
  GetListMemberMissionController
} from "./controllers/user.controller.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;

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

// Case 1. 도메인 문제 일때
// app.use(
//   cors({
//     origin: ["<프론트엔드_주소_및_포트>"],
//   })
// );

// Case 2. 토큰 cors 오류 뜰때
// app.use(
//   cors({
//     allowedHeaders: ["x-auth-token", ...],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("Hello World!");
});

// 회원 가입 api
app.post("/api/v1/users/signup", handleUserSignUp);

// 회원 정보 수정하는 api
app.post("/api/v1/users/change-info", UpdateMemberInfoController);

// 가게를 생성하는 api
app.post("/api/v1/store", InsertStoreController);

// 리뷰를 생성하는 api
app.post("/api/v1/review", InsertReviewController);

// 가게의 미션 생성하기
app.post("/api/v1/mission", InsertMissionController);

// 가게의 미션을 멤버가 도전 중인 미션에 추가
app.post("/api/v1/member/mission", InsertMemberMissionController);

// 특정 가게의 리뷰를 다 가져오는 api
app.get("/api/v1/stores/:storeId/reviews", GetListStoreReviewsController);

// 특정 멤버의 리뷰를 다 가져오는 api
app.get("/api/v1/members/:memberId/reviews", GetListMemberReviewsController);

// 특정 가게의 미션을 가져오는 api
app.get("/api/v1/stores/:storeId/missions", GetListStoreMissionController);

// 특정 멤버의 진행 중인 미션 목록 가져오는 api
app.get("/api/v1/members/:memberId/missions", GetListMemberMissionController);


//passport 사용하기
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

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
 * 전역 오류를 처리하기 위한 미들웨어
 */
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(passport.session());