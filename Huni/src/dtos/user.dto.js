export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

export const responseFromUser = ({ user, preferences }) => {
// user 객체가 배열 형태로 반환되었기 때문에 첫 번째 요소로 접근
    const userData = user[0];

    return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        gender: userData.gender,
        birth: userData.birth,
        address: userData.address,
        detailAddress: userData.detailaddress,
        phoneNumber: userData.phone_number,
        preferences: preferences.map((pref) => ({
        id: pref.id,
        categoryId: pref.food_category_id,
        categoryName: pref.name,
        })),
    };
}; 

export const bodyToReview = (body) =>{
    return{
        userid: body.userid,
        storeid:body.storeid,
        body: body.body,
        score: body.score,
    };

};

export const bodyToMission = (body) =>{
    return{
        storeid:body.storeid,
        reward: body.reward,
        deadline:body.deadline,
        missionspec: body.missionspec,
    };
};

export const bodyToUserMission = (body) =>{
    return{
        userid: body.userid,
        missionid: body.missionid,
        status: body.status
    }
}