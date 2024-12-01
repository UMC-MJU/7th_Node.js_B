export const bodyToUser = (body) => {

  return {
    name: body.name ?? null,
    gender: body.gender ?? null,
    age: body.age ?? null,
    address: body.address ?? null,
    specAddress: body.specAddress ?? null,
    phoneNum: body.phoneNum ?? null,
    status: body.status ?? null,
    email: body.email,
    point: body.point ?? 0,
    preferences: body.preferences ?? [],
  };
};


export const responseFromUser = ({ member, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference
  );
  return {

    preferCategory: preferFoods
  };

};

export const bodyToUserAddMission = (body) => {
  return {
    memberId: body.memberId,
    missionId: body.missionId,
    status: body.status,
  };
};

export const responseFromUserMission = (body) => {
  return {
    memberId: body.memberId,
    missionId: body.missionId,
  };
};

// 내가 작성한 리뷰목록 얻기
export const responseFromUserReviews = (userReview) => {
  return {
    data: userReview,
    pagination: {
      cursor: userReview.length ? userReview[userReview.length - 1].id : null,
    },
  };
};

//내가 진행중인 미션목록 얻기
export const responseFromUserMissionOngoing = (ongoingMissions) => {
  return {
    data: ongoingMissions,
    pagination: {
      cursor: ongoingMissions.length ? ongoingMissions[ongoingMissions.length - 1].id : null,
    },
  };
};


// 내가 진행중인 미션을 완료한 미션으로 바꾸기
export const bodyToUserMissionComplete = (body) => {

  return {
    status: body.status,
  };
};

export const responseFromUserMissionComplete = (missionComplete) => {
  return {
    data: missionComplete
  };
};