import {
    responseFromStore,
    responseFromStoreReview,
    responseFromStoreMission,
    responseFromStoreMissionChallenge,
    responseFromReviews,
    responseFromMissions,
} from "../dtos/store.dto.js";;
import {
    addStore,
    getStore,
    getRegionByRegionId,
    addStoreReview,
    getStoreReview,
    getStoreReviewImageByReviewId,
    setStoreReviewImage,
    addStoreMission,
    getStoreMission,
    addStoreMissionChallenge,
    getStoreMissionChallenge,
    getAllStoreReviews,
    getAllStoreMissions,
} from "../repositories/store.repository.js";

// 가게 추가
export const storeAddition = async (data) => {
    const storeId = await addStore({
        regionId: data.regionId,
        name: data.name,
        address: data.address,
        score: data.score,
    });

    const store = await getStore(storeId);
    const region = await getRegionByRegionId(data.regionId);

    return responseFromStore(
        {
            store,
            region
        });
};

// 가게 리뷰 추가
export const storeReviewAddition = async (data) => {
    const reviewId = await addStoreReview({
        memberId: data.memberId,
        storeId: data.storeId,
        body: data.body,
        score: data.score,
    });

    if (reviewId === null) {
        throw new Error("가게가 존재하지 않습니다.");
    }

    for (const reviewImage of data.reviewImages) {
        await setStoreReviewImage(reviewId, reviewImage);
    }

    const review = await getStoreReview(reviewId);
    const reviewImages = await getStoreReviewImageByReviewId(reviewId);

    return responseFromStoreReview(
        {
            review,
            reviewImages,
        });
};

// 가게 미션 추가
export const storeMissionAddition = async (data) => {
    const missionId = await addStoreMission({
        storeId: data.storeId,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.missionSpec,
    });

    const mission = await getStoreMission(missionId);

    return responseFromStoreMission(
        {
            mission,
        });
};

// 가게 미션 도전 중인 미션에 추가
export const storeMissionChallengeAddition = async (data) => {
    const memMissionId = await addStoreMissionChallenge({
        memberId: data.memberId,
        missionId: data.missionId,
        status: data.status,
    });

    if (memMissionId === null) {
        throw new Error("이미 도전 중입니다.");
    }

    const missionChallenge = await getStoreMissionChallenge(memMissionId);

    return responseFromStoreMissionChallenge(
        {
            missionChallenge,
        });
};

// 가게 리뷰 불러오기
export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
};

// 가게 리뷰 불러오기
export const listStoreMissions = async (storeId, cursor) => {
    const missions = await getAllStoreMissions(storeId, cursor);
    return responseFromMissions(missions);
};