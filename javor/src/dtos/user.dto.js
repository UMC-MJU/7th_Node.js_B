export const bodyToUser = (body) => {

  return {
    name: body.name,
    gender: body.gender,
    age: body.age,
    address: body.address,
    spec_address: body.spec_address,
    phone_num: body.phone_num,
    status: body.status,
    email: body.email,
    point: body.point,
    preferences: body.preferences,
  };
};


export const responseFromUser = (body) => {
  return {
    user: body.user,
    preferences: body.preferences,
  };
};

export const bodyToUserMission = (body) => {
  return {
    member_id: body.member_id,
    mission_id: body.mission_id,
    status: body.status,
  };
};

export const responseFromUserMission = (body) => {
  return {
    body: body.UserMission
  };
};
