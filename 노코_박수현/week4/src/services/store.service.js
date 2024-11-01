import {
    responseFromStore,
    responseFromStoreReview,
    responseFromStoreMission,
    responseFromStoreMissionChallenge,
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
} from "../repositories/store.repository.js";

// 가게 추가
export const storeAddition = async (data) => {
    const additionStoreId = await addStore({
        region_id: data.region_id,
        name: data.name,
        address: data.address,
        score: data.score,
    });

    const store = await getStore(additionStoreId);
    const storeRegion = await getRegionByRegionId(data.region_id);

    return responseFromStore(
        {
            store,
            storeRegion
        });
};

// 가게 리뷰 추가
export const storeReviewAddition = async (data) => {
    const additionReviewId = await addStoreReview({
        member_id: data.member_id,
        store_id: data.store_id,
        body: data.body,
        score: data.score,

    });

    if (additionReviewId === null) {
        throw new Error("가게가 존재하지 않습니다.");
    }

    for (const reviewImage of data.reviewImages) {
        await setStoreReviewImage(additionReviewId, data.store_id, reviewImage);
    }

    const review = await getStoreReview(additionReviewId);
    const reviewImages = await getStoreReviewImageByReviewId(additionReviewId);

    return responseFromStoreReview(
        {
            review,
            reviewImages,
        });
};

// 가게 미션 추가
export const storeMissionAddition = async (data) => {
    const additionMissionId = await addStoreMission({
        store_id: data.store_id,
        reward: data.reward,
        deadline: data.deadline,
        mission_spec: data.mission_spec,
    });

    const mission = await getStoreMission(additionMissionId);

    return responseFromStoreMission(
        {
            mission,
        });
};

// 가게 미션 도전 중인 미션에 추가
export const storeMissionChallengeAddition = async (data) => {
    const additionMissionChallengeId = await addStoreMissionChallenge({
        member_id: data.member_id,
        mission_id: data.mission_id,
        status: data.status,
    });

    if (additionMissionChallengeId === null) {
        throw new Error("이미 도전 중입니다.");
    }

    const missionChallenge = await getStoreMissionChallenge(additionMissionChallengeId);

    return responseFromStoreMissionChallenge(
        {
            missionChallenge,
        });
};