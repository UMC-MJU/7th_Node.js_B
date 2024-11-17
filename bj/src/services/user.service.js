import { responseFromUser ,
    responseFromReviewsDTO, 
    responseFromMissionsDTO,
    responseFromMReviewsDTO,
    responseFromMMissionsDTO,
} from "../dtos/user.dto.js";
import { DuplicateStoreMissionError,
    DuplicateMemberReviewError,
    DuplicateStoreReviewError,
    DuplicateStoreError,
    DuplicateMemberMissionError,
    DuplicateReviewError,
    DuplicateRegionError, 
    DuplicateUserEmailError, 
    DuplicateUserError, 
    DuplicatePreferError } from "../errors.js";
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
    getAllMemberReviews,
    getAllStoreMissions,
    getAllMemberMissions,
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
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    if( user == null ){
        throw new DuplicateUserError("user데이터 가져오는 것을 실패했습니다.", data);
    }

    const preferences = await getUserPreferencesByUserId(joinUserId);
    if (preferences == null ){
        throw new DuplicatePreferError("prefer데이터 가져오는 것을 실패했습니다.", data);
    }
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
    if(joinStoreId == null){
        throw new DuplicateRegionError("지역에 없는 가게 데이터 입니다.", data);
    }
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
    if(joinReviewId == null){
        throw new DuplicateReviewError("해당하는 가게 데이터 or 멤버 데이터가 없습니다.", data);
    }
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
    if(joinMissionId == null){
        throw new DuplicateStoreError("해당가게가 없습니다.", data);
    }
    return joinMissionId;
}

export const InsertMemberMissionService = async (data) => {
    console.log("body12:", data)
    const joinMemberMissionId = await addMemberMission({
        memberId : data.memberId,
        missionId : data.missionId,
        status : data.status,
    });
    if(joinMemberMissionId == null){
        throw new DuplicateMemberMissionError("해당가게 or 해당 멤버 데이터가 없습니다.", data);
    }
    return joinMemberMissionId;
}

// 특정 가게의 리뷰 가져오는 서비스
export const listStoreReviewsService = async (storeId,cursor) => {
    const reviews = await getAllStoreReviews(storeId,cursor);
    if(reviews == null){
        throw new DuplicateStoreReviewError("특정 가게의 리뷰를 가져오는데 실패했습니다 .", storeId);
    }
    return responseFromReviewsDTO(reviews);
};

// 특정 멤버의 리뷰를 가져오는 서비스
export const listMemberReviewsService = async (memberId,cursor) => {
    const reviews = await getAllMemberReviews(memberId,cursor);
    if(reviews == null){
        throw new DuplicateMemberReviewError("특정 멤버의 리뷰를 가져오는데 실패했습니다 .", memberId);
    }
    return responseFromMReviewsDTO(reviews);
};

// 특정 가게의 미션을 가져오는 서비스
export const listStoreMissionService = async (storeId,cursor) => {
    const missions = await getAllStoreMissions(storeId,cursor);
    if(missions == null){
        throw new DuplicateStoreMissionError("특정 가게의 미션을 가져오는데 실패했습니다 .", storeId);
    }
    return responseFromMissionsDTO(missions);
};

// 특정 멤버의 미션을 가져오는 서비스
export const listMemberMissionService = async (memberId,status,cursor) => {
    const missions = await getAllMemberMissions(memberId,status,cursor);
    if(missions == null){
        throw new DuplicateMemberReviewError("특정 멤버의 미션을 가져오는데 실패했습니다 .", memberId);
    }
    return responseFromMMissionsDTO(missions);
};