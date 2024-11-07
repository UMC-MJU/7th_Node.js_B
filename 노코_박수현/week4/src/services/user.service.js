import {
    responseFromUser,
    responseFromUserAgree,
    responseFromReviews,
    responseFromMissions,
} from "../dtos/user.dto.js";;
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    getUserAgree,
    setUserAgree,
    getAllUserReviews,
    getAllUserMissions,
    getMemberMissionId,
    patchUserMissionComplete
} from "../repositories/user.repository.js";

// 유저 회원가입
export const userSignUp = async (data) => {
    const joinUserId = await addUser({
        name: data.name,
        gender: data.gender,
        age: data.age,
        address: data.address,
        specAddress: data.specAddress,
        phoneNum: data.phoneNum,
        status: data.status,
        email: data.email,
        point: data.point,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser(
        {
            user,
            preferences
        });
};

// 유저 약관 동의
export const userAgreeAddition = async (data) => {

    for (const condition of data.terms) {
        await setUserAgree(data.memberId, condition);
    }

    const userAgree = await getUserAgree(data.memberId);
    return responseFromUserAgree(
        {
            userAgree,
        });
};

// 내가 작성한 리뷰 목록 불러오기
export const listUserReviews = async (memberId, cursor) => {
    const reviews = await getAllUserReviews(memberId, cursor);
    return responseFromReviews(reviews);
};

// 내가 진행 중인 미션 목록 불러오기
export const listUserMissions = async (memberId, status, cursor) => {
    const missions = await getAllUserMissions(memberId, status, cursor);
    return responseFromMissions(missions);
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기
export const CompleteUserMission = async (data, memberId, missionId) => {
    const memberMissionId = await getMemberMissionId(memberId, missionId)
    const missionComplete = await patchUserMissionComplete(data.status, memberMissionId);
    return responseFromMissions({
        missionComplete
    });
};