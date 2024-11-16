import { responseFromUser, responseFromReviews, responseFromMissions} from "../dtos/user.dto.js";
import { DuplicateStoreError, DuplicateUserEmailError, DuplicateUserError, DuplicatePreferError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  setReviewinStore,
  setMissioninStore,
  setMissioninUser,
  getAllStoreReviews,
  getAllUserReviews,
  getAllStoreMissions,
  getAllUserMissions
} from "../repositories/user.repositories.js";


export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    // birth: data.birth,
    address: data.address,
    specaddress: data.specaddress,
    phoneNum: data.phoneNum,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);
  if( preferences == null){
    throw new DuplicatePreferError("존재하지 않는 선호음식입니다.", data);
  }

  return responseFromUser({ user, preferences });
};

export const ReviewMake = async (data) =>{
    const joinReview = await setReviewinStore({
        userid : data.userid,
        storeid: data.storeid,
        body: data.body,
        score: data.score,
    });

    if(joinReview == null){
      throw new DuplicateStoreError("없는 가게입니다.", data);
    }

    return joinReview;
};

export const MissionMake = async (data) => {
    const joinMission = await setMissioninStore({
        storeid: data.storeid,
        reward: data.reward,
        deadline: data.deadline,
        missionspec: data.missionspec,
    });

    if(joinMission == null){
      throw new DuplicateStoreError("없는 가게입니다.", data);
    }
    return joinMission;
}

export const UserMissionMake = async (data) => {
    const joinMission = await setMissioninUser({
        userid: data.userid,
        missionid: data.missionid,
        status: data.status,
    })

    if(joinMission == null){
      throw new DuplicateUserError("사용자가 존재하지 않습니다.", data);
    }
    return joinMission;
}

//가게 리뷰 get
export const listStoreReviews = async (storeId,cursor) =>{
  const reviews = await getAllStoreReviews(storeId,cursor);

  if(reviews == null){
    throw new DuplicateStoreError("리뷰가 존재하지 않습니다.", data);
  }
  return responseFromReviews(reviews);
}

//유저 리뷰 get
export const listUserReviews = async (memberId,cursor) =>{
  const reviews = await getAllUserReviews(memberId,cursor);

  if(reviews == null){
    throw new DuplicateUserError("리뷰가 존재하지 않습니다..", memberId);
  }
  return responseFromReviews(reviews);
}

//가게 미션 get
export const listStoreMissions = async (storeId,cursor) =>{
  const missions = await getAllStoreMissions(storeId,cursor);

  if(missions == null){
    throw new DuplicateStoreError("존재하지 않는 미션입니다.", data);
  }
  return responseFromMissions(missions);
}

//유저 미션 get
export const listUserMissions = async (memberId, status,cursor) =>{
  const missions = await getAllUserMissions(memberId, status,cursor);

  if(missions == null){
    throw new DuplicateUserError("존재하지 않는 미션입니다.", memberId);
  }
  return responseFromMissions(missions);
}