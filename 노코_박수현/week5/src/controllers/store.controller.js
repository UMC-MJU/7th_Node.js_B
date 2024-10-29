import { StatusCodes } from "http-status-codes";
import {
    bodyToStore,
    bodyToStoreReview,
    bodyToStoreMission,
} from "../dtos/store.dto.js";
import {
    storeAddition,
    storeReviewAddition,
    storeMissionAddition,
} from "../services/store.service.js";

// 가게 추가
export const handleStoreAddition = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeAddition(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};

//가게 리뷰 추가
export const handleStoreReviewAddition = async (req, res, next) => {
    console.log("가게에 리뷰 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeReviewAddition(bodyToStoreReview(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};

// 가게 미션 추가
export const handleStoreMissionAddition = async (req, res, next) => {
    console.log("가게에 미션 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeMissionAddition(bodyToStoreMission(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};