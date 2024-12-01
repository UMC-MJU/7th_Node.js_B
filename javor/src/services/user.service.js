import {
    responseFromUser,
    responseFromUserMission,
    responseFromUserReviews,
    responseFromUserMissionOngoing,
    responseFromUserMissionComplete,
} from "../dtos/user.dto.js";

import {
    DuplicateUserEmailError,
    DuplicateUserMissionError,
    NotFoundUserMissionError,
    NotFoundUserReviewError
} from "../errors.js";

import {
    addUser,
    getUserByEmail,
    updateUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    addUserMission,
    getUserMission,
    getMissionId,
    getUserReviewList,
    getUserOngoingMissionList,
    patchUserMissionComplete
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
    //이메일로 기존의 사용자인지 확인
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
        // 이메일이 이미 존재하면 사용자 정보 갱신
        const updatedUser = await updateUser(data.email, data);
        const preferences = await getUserPreferencesByUserId(existingUser.id);
        return responseFromUser({ user: updatedUser, preferences });
    }

    //새 사용자 생성
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
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
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

export const userAddMission = async (data) => {
    const joinUserMission = await addUserMission(data);

    if (joinUserMission && joinUserMission.duplicate) {
        throw new DuplicateUserMissionError("중복된 미션입니다.", data);
    }

    if (!joinUserMission) {
        throw new NotFoundUserMissionError("없는 미션입니다.", data);
    }

    /*const UserMissionData = await getUserMission(joinUserMission);
    if (!UserMissionData) {
        throw new NotFoundUserMissionError("미션 정보를 찾을 수 없습니다.", data);
    }*/

    return responseFromUserMission(UserMissionData);
};



export const userReviewList = async (memberId, cursor) => {
    const reviews = await getUserReviewList(memberId, cursor);

    if (reviews === null) {
        throw new NotFoundUserReviewError("리뷰정보가 없습니다.", memberId);
    }
    return responseFromUserReviews(reviews);
};

export const userOngoingMissionList = async (memberId, status, cursor) => {
    const missions = await getUserOngoingMissionList(memberId, status, cursor);

    if (missions === null) {
        throw new NotFoundUserMissionError("미션정보를 찾을 수 없습니다.", memberId);
    }
    return responseFromUserMissionOngoing(missions);
};

export const userMissionToComplete = async (data, memberId, missionId) => {
    const memberMissionId = await getMissionId(memberId, missionId, data.status);

    if (!memberMissionId) {
        throw new NotFoundUserMissionError("미션 또는 멤버 정보가 없습니다.", data);
    }

    const missionComplete = await patchUserMissionComplete(data.status, memberMissionId);

    return responseFromUserMissionComplete({
        missionComplete
    });
};