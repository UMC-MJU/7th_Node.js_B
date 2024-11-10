import {
    responseFromUser,
    responseFromUserMission,
    responseFromUserReviews,
    responseFromUserMissionOngoing,
    responseFromUserMissionComplete,
} from "../dtos/user.dto.js";
import {
    addUser,
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

export const userAddMission = async (data) => {
    const joinUserMission = await addUserMission({
        member_id: data.member_id,
        mission_id: data.mission_id,
        status: data.status
    });

    if (joinUserMission === null) {
        throw new Error("이미 존재하는 미션입니다.");
    }

    const UserMission = await getUserMission(joinUserMission);
    return responseFromUserMission(
        {
            UserMission
        });
};

export const userReviewList = async (memberId, cursor) => {
    const reviews = await getUserReviewList(memberId, cursor);
    return responseFromUserReviews(reviews);
};

export const userOngoingMissionList = async (memberId, status, cursor) => {
    const missions = await getUserOngoingMissionList(memberId, status, cursor);
    return responseFromUserMissionOngoing(missions);
};

export const userMissionToComplete = async (data, memberId, missionId) => {
    const memberMissionId = await getMissionId(memberId, missionId);
    const missionComplete = await patchUserMissionComplete(data.status, memberMissionId);
    return responseFromUserMissionComplete({
        missionComplete
    });
};