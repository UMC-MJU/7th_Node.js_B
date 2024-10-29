import { StatusCodes } from "http-status-codes";
import {
    bodyToStore,
    bodyToStoreReview,
} from "../dtos/store.dto.js";
import {
    storeAddition,
    storeReviewAddition,
} from "../services/store.service.js";

export const handleStoreAddition = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeAddition(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};

export const handleStoreReviewAddition = async (req, res, next) => {
    console.log("가게에 리뷰 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeReviewAddition(bodyToStoreReview(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};

