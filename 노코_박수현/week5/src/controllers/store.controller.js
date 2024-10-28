import { StatusCodes } from "http-status-codes";
import {
    bodyToStore,
    bodyToReview
} from "../dtos/store.dto.js";
import {
    storeAddition,
    reviewAddition
} from "../services/store.service.js";

export const handleStoreAddition = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await storeAddition(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};

export const handleReviewAddition = async (req, res, next) => {
    console.log("가게에 리뷰 추가를 요청했습니다!");
    console.log("body:", req.body);

    const store = await reviewAddition(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: store });
};

