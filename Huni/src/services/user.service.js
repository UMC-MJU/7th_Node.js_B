import { responseFromUser} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  setReviewinStore,
  setMissioninStore,
  setMissioninUser
} from "../repositories/user.repositories.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
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

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const ReviewMake = async (data) =>{
    const joinReview = await setReviewinStore({
        userid : data.userid,
        storeid: data.storeid,
        body: data.body,
        score: data.score,
    });
    // console.log("body33", data);

    return joinReview;
};

export const MissionMake = async (data) => {
    const joinMission = await setMissioninStore({
        storeid: data.storeid,
        reward: data.reward,
        deadline: data.deadline,
        missionspec: data.missionspec,
    });
    return joinMission;
}

export const UserMissionMake = async (data) => {
    const joinMission = await setMissioninUser({
        userid: data.userid,
        missionid: data.missionid,
        status: data.status,
    })
    return joinMission;
}