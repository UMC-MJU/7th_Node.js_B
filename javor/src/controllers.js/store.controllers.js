// 가게를 추가
// 가게에 미션 추가
// 가게에 리뷰 추가

import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToStoreMission, bodyToStoreReview } from "../dtos/store.dto.js";
import { storeAdd, storeMissionAdd, storeReviewAdd } from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {

    console.log("가게를 추가합니다.");
    console.log("body:", req.body);

    const storeData = bodyToStore(req.body);
    const newStore = await storeAdd(storeData);

    res.status(StatusCodes.OK).json({ result: newStore });

}

export const handleStoreMissionAdd = async (req, res, next) => {

    console.log("가게에 미션을 추가합니다.");
    console.log("body:", req.body);

    const storeMissionData = bodyToStoreMission(req.body);
    const newStoreMission = await storeMissionAdd(storeMissionData);

    res.status(StatusCodes.OK).json({ result: newStoreMission });

}

export const handleStoreReviewAdd = async (req, res, next) => {

    console.log("가게에 리뷰를 추가합니다.");
    console.log("body", req.body);

    const StoreReviewData = bodyToStoreReview(req.body);
    const newStoreReview = await storeReviewAdd(StoreReviewData);

    res.status(StatusCodes.OK).json({ result: newStoreReview });

}




