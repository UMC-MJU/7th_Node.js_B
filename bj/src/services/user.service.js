import { responseFromUser ,responseFromReviewsDTO} from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    addStore,
    addReview,
    addMission,
    addMemberMission,
    getAllStoreReviews,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
    console.log("body12:", data)
    const joinUserId = await addUser({
        email: data.email,
        age: data.age,
        name: data.name,
        gender: data.gender,
        address: data.address,
        specAddress: data.specAddress,
        phoneNum: data.phoneNum,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({
        user, preferences 
    });
};

export const InsertStoreService = async (data) => {
    console.log("body12:", data)
    const joinStoreId = await addStore({
        regionId : data.regionId,
        name : data.name,
        address : data.address,
        score : data.score,
    });
    return joinStoreId;
}

export const InsertReviewService = async (data) =>{
    console.log("body12", data);
    const joinReviewId = await addReview({
        memberId : data.memberId,
        storeId: data.storeId,
        body: data.body,
        score: data.score,
    });
    return joinReviewId;
};

export const InsertMissionService = async (data) => {
    console.log("body12:", data)
    const joinMissionId = await addMission({
        storeId : data.storeId,
        reward : data.reward,
        deadline : data.deadline,
        missionSpec : data.missionSpec,
    });
    return joinMissionId;
}

export const InsertMemberMissionService = async (data) => {
    console.log("body12:", data)
    const joinMemberMissionId = await addMemberMission({
        memberId : data.memberId,
        missionId : data.missionId,
        status : data.status,
    });
    return joinMemberMissionId;
}

export const listStoreReviewsService = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviewsDTO(reviews);
};