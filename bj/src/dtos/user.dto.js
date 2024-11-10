export const bodyToUser = (body) => {
    console.log("body11:", body)
    return {
        email: body.email,
        age: body.age,
        name: body.name,
        gender: body.gender,
        address: body.address || "",
        specAddress: body.specAddress || "",
        phoneNum: body.phoneNum,
        preferences: body.preferences
    };
};

export const responseFromUser = (body) => {
    console.log("body11:", body)
    const preferFoods = body.preferences.map(
        (preference) => preference.foodCategory.name
    );
    
    return {
        email: body.email,
        name: body.name,
        preferCategory: preferFoods,
    };
};

// 가게 생성에 필요한 DTO
export const InsertStoreDTO = (body) => {
    console.log("body11:", body)
    return {
        regionId : body.region_id,
        name : body.name,
        address : body.address,
        score : body.score,
    };
};

// 리뷰 생성에 필요한 DTO
export const InsertReviewDTO = (body) =>{
    console.log("body11:", body)
    return{
        memberId: body.member_id,
        storeId: body.store_id,
        body: body.body,
        score: body.score,
    };
};
// 미션 생성에 필요한 DTO
export const InsertMissionDTO = (body) => {
    console.log("body11:", body)
    const deadline = new Date(body.deadline);
    return {
        storeId : body.store_id,
        reward : body.reward,
        deadline,
        missionSpec : body.mission_spec,
    };
};
// 멤버가 미션을 추가하는데 필요한 DTO
export const InsertMemberMissionDTO = (body) => {
    console.log("body11:", body)
    return {
        memberId : body.member_id,
        missionId : body.mission_id,
        status : body.status,
    };
};

// 리뷰 가져오는데 필요한 DTO
export const responseFromReviewsDTO = (reviews) => {
    return {
        data: reviews,
        pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};