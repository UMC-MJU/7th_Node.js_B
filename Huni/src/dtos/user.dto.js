export const bodyToUser = (body) => {
    // const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
    //   birth,
      address: body.address || "",
      specaddress: body.specaddress || "",
      phoneNum: body.phoneNum,
      preferences: body.preferences,
    };
  };

export const responseFromUser = ({ user, preferences }) => {
// user 객체가 배열 형태로 반환되었기 때문에 첫 번째 요소로 접근
    const preferFoods = preferences.map(
        (preference) => preference.foodCategory.name
        );

    return {
        email: user.email,
        name: user.name,
        preferCategory: preferFoods,
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
    const deadline = new Date(body.deadline);
    return{
        storeid:body.storeid,
        reward: body.reward,
        deadline,
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

//리뷰
export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};

//미션
export const responseFromMissions = (missions) => {
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    };
};

//회원정보를 수정
export const bodyToUserUpdate = (body) => {
    return {
        name : body.name,
        gender : body.gender,
        age : body.age,
        address : body.address,
        specaddress : body.spec_address,
        phonenum : body.phone_number,
        email : body.email,
    };
}