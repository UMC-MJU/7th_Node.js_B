import { responseFromUser } from "../dtos/user.dto.js";
import {
    addMember,
    getMember,
    getUserPreferencesByUserId,
    setPreference,
    addStore,
    addReview,
    addMission,
    addMemberMission,
    getAllStoreReviews,
    responseFromReviews,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
    const joinUserId = await addMember({
        email: data.email,
        name: data.name,
        gender: data.gender,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getMember(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({
        user, preferences 
    });
};

export const InsertStoreService = async (data) => {
    console.log("body12:", data)
    const joinMissionId = await addStore({
        regionId : data.regionId,
        name : data.name,
        address : data.address,
        score : data.score,
        createdAt : data.createdAt,
        updatedAt : data.updatedAt,
    });
    return joinMissionId;
}

export const InsertReviewService = async (data) =>{
    console.log("body12", data);
    const joinReviewId = await addReview({
        userid : data.userid,
        storeid: data.storeid,
        body: data.body,
        score: data.score,
        createdAt : data.createdAt,
    });
    return joinReviewId;
};

export const InsertMissionService = async (data) => {
    console.log("body12:", data)
    const joinMissionId = await addMission({
        storeId : data.storeId,
        reward : data.reward,
        deadline : data.deadline,
        missionspec : data.missionspec,
        createdAt : data.createdAt,
        updatedAt : data.updatedAt,
    });
    return joinMissionId;
}

export const InsertMemberMissionService = async (data) => {
    console.log("body12:", data)
    const joinMemberMissionId = await addMemberMission({
        memberId : data.memberId,
        missionId : data.missionId,
        status : data.status,
        createdAt : data.createdAt,
        updatedAt : data.updatedAt,
    });
    return joinMemberMissionId;
}

// 가게에 속한 리뷰들을 조회하는 api Service
export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
};