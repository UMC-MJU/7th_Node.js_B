import { responseFromStore, responseFromStoreMission, responseFromStoreReview } from "../dtos/store.dto.js";
import { addStore, addStoreMission, addStoreReview } from "../repositories/store.repository.js";

export const storeAdd = async (data) => {
    const joinAddStore = await addStore({
        region_id: data.region_id,
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
        store_id: data.store_id,
        reward: data.reward,
        deadline: data.deadline,
        mission_spec: data.mission_spec
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
        member_id: data.member_id,
        store_id: data.store_id,
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


