import {
    responseFromStore,
    responseFromStoreMission,
    responseFromStoreReview,
    responseFromStoreReviewGet,
    responseFromStoreMissionGet
} from "../dtos/store.dto.js";
import {
    getNoValueError,
    NoStoreError,
    NotFoundStoreRegionError,
    NotFoundUserReviewError
} from "../errors.js";
import {
    addStore,
    getStore,
    addStoreMission,
    getStoreMission,
    addStoreReview,
    getStoreReview,
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
        throw new NotFoundStoreRegionError("지역이 존재하지 않습니다.", data);
    }

    const Store = await getStore(joinAddStore);
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
        throw new NoStoreError("가게가 존재하지 않습니다.", data);
    }

    const MissionStore = await getStoreMission(joinAddStoreMission);
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

    if (joinAddStoreReview === null) {
        throw new NoStoreError("가게가 존재하지 않습니다.", data);
    }

    const ReviewStore = await getStoreReview(joinAddStoreReview);
    return responseFromStoreReview(
        {
            ReviewStore
        }
    )
}

export const storeReviewList = async (storeId, cursor) => {
    const reviews = await getStoreReviewList(storeId, cursor);

    if (reviews === null) {
        throw new getNoValueError("정보를 불러올 수 없습니다.", storeId);
    }
    return responseFromStoreReviewGet(reviews);
};

export const storeMissionList = async (storeId, cursor) => {
    const missions = await getStoreMissionList(storeId, cursor);

    if (missions === null) {
        throw new getNoValueError("정보를 불러올 수 없습니다.", storeId);
    }
    return responseFromStoreMissionGet(missions);
}

