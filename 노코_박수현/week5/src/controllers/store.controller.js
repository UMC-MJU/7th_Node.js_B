import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { reviewAddition } from "../services/store.service.js";

export const handleReviewAddition = async (req, res, next) => {
    console.log("가게에 리뷰 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const store = await reviewAddition(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
    1
};
