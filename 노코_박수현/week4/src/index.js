import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
    handleUserSignUp,
    handleUserAgreeAddition,
    handleListUserReviews,
    handleListUserMissions,
    handleUserMissionComplete,
} from "./controllers/user.controller.js";
import {
    handleStoreAddition,
    handleStoreReviewAddition,
    handleStoreMissionAddition,
    handleStoreMissionChallengeAddition,
    handleListStoreReviews,
    handleListStoreMissions
} from "./controllers/store.controller.js";

BigInt.prototype.toJSON = function () { // bigint 호환
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

dotenv.config();

const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/users/terms", handleUserAgreeAddition)


app.post("/api/v1/stores/", handleStoreAddition);
app.post("/api/v1/stores/reviews", handleStoreReviewAddition);
app.post("/api/v1/stores/missions", handleStoreMissionAddition);
app.post("/api/v1/stores/missions/challenges", handleStoreMissionChallengeAddition);


app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

app.get("/api/v1/users/:memberId/stores/reviews", handleListUserReviews);
app.get("/api/v1/users/:memberId/missions", handleListUserMissions);

app.patch("/api/v1/users/:memberId/missions/:missionId/complete", handleUserMissionComplete)

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