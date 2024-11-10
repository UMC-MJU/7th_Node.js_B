import {
    responseFromStore,
    responseFromStoreMission,
    responseFromStoreReview,
    responseFromStoreReviewGet,
    responseFromStoreMissionGet
} from "../dtos/store.dto.js";
import {
    addStore,
    addStoreMission,
    addStoreReview,
    getStoreReviewList,
    getStoreMissionList
} from "../repositories/store.repository.js";

export const storeAdd = async (data) => {
    const joinAddStore = await addStore({
        regionId: data.regionId,
        name: data.name,
        address: data.address,
        score: data.score
    });
    if (joinAddStore === null) {
        throw new Error("이미 존재하는 가게입니다.");
    }

    const Store = await addStore(joinAddStore);
    return responseFromStore(
        {
            Store
        }
    );
}

export const storeMissionAdd = async (data) => {
    const joinAddStoreMission = await addStoreMission({
        storeId: data.storeId,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.missionSpec
    });
    if (joinAddStoreMission === null) {
        throw new Error("이미 미션에 추가한 가게입니다.");
    }
    const MissionStore = await addStoreMission(joinAddStoreMission);
    return responseFromStoreMission(
        {
            MissionStore
        }
    )
}

export const storeReviewAdd = async (data) => {
    const joinAddStoreReview = await addStoreReview({
        memberId: data.memberId,
        storeId: data.storeId,
        body: data.body,
        score: data.score
    });


    const ReviewStore = await addStoreReview(joinAddStoreReview);
    return responseFromStoreReview(
        {
            ReviewStore
        }
    )
}

export const storeReviewList = async (storeId, cursor) => {
    const reviews = await getStoreReviewList(storeId, cursor);
    return responseFromStoreReviewGet(reviews);
};

export const storeMissionList = async (storeId, cursor) => {
    const missions = await getStoreMissionList(storeId, cursor);
    return responseFromStoreMissionGet(missions);
}

