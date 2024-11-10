// 가게를 추가
// 가게에 미션 추가
// 가게에 리뷰 추가
// 가게 리뷰 얻기
// 특정 가게 미션 얻기


import { StatusCodes } from "http-status-codes";
import {
    bodyToStore,
    bodyToStoreMission,
    bodyToStoreReview
} from "../dtos/store.dto.js";
import {
    storeAdd,
    storeMissionAdd,
    storeReviewAdd,
    storeReviewList,
    storeMissionList
} from "../services/store.service.js";

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

export const handleStoreReviewsList = async (req, res, next) => {
    const reviews = await storeReviewList(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
};

export const handleStoreMissionsList = async (req, res, next) => {
    const missions = await storeMissionList(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json(missions);
};



