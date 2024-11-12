import { StatusCodes } from "http-status-codes";
import {
    bodyToStore,
    bodyToStoreReview,
    bodyToStoreMission,
    bodyToStoreMissionChallenge,
} from "../dtos/store.dto.js";
import {
    storeAddition,
    storeReviewAddition,
    storeMissionAddition,
    storeMissionChallengeAddition,
    listStoreReviews,
    listStoreMissions,
} from "../services/store.service.js";

// 가게 추가
export const handleStoreAddition = async (req, res, next) => {
    try {
        console.log("가게 추가를 요청했습니다!");
        console.log("body:", req.body);

        const store = await storeAddition(bodyToStore(req.body));
        res.status(StatusCodes.OK).success(store);
    } catch (err) {
        return next(err)
    }
};

//가게 리뷰 추가
export const handleStoreReviewAddition = async (req, res, next) => {
    try {
        console.log("가게에 리뷰 추가를 요청했습니다!");
        console.log("body:", req.body);

        const store = await storeReviewAddition(bodyToStoreReview(req.body));
        res.status(StatusCodes.OK).success(store);
    } catch (err) {
        return next(err)
    }
};

// 가게 미션 추가
export const handleStoreMissionAddition = async (req, res, next) => {
    try {
        console.log("가게에 미션 추가를 요청했습니다!");
        console.log("body:", req.body);

        const store = await storeMissionAddition(bodyToStoreMission(req.body));
        res.status(StatusCodes.OK).success(store);
    } catch (err) {
        return next(err)
    }
};

// 가게 미션 도전 중인 미션에 추가
export const handleStoreMissionChallengeAddition = async (req, res, next) => {
    try {
        console.log("가게의 미션을 도전 중인 미션에 추가를 요청했습니다!");
        console.log("body:", req.body);

        const store = await storeMissionChallengeAddition(bodyToStoreMissionChallenge(req.body));
        res.status(StatusCodes.OK).success(store);
    } catch (err) {
        return next(err)
    }
};

//가게 리뷰 불러오기
export const handleListStoreReviews = async (req, res, next) => {
    try {
        const reviews = await listStoreReviews(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        return next(err)
    }
};

//가게 미션 불러오기
export const handleListStoreMissions = async (req, res, next) => {
    try {
        const missions = await listStoreMissions(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).success(missions);

    } catch (err) {
        return next(err)
    }
};