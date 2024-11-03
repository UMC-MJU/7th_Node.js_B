export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
    };
};

export const responseFromUser = (body) => {
    return {
    };
};
// 리뷰 생성에 필요한 DTO
export const InsertReviewDTO = (body,time) =>{
    console.log("body11:", body)
    return{
        userid: body.member_id,
        storeid: body.store_id,
        body: body.body,
        score: body.score,
        createdAt : time,
    };
};
// 미션 생성에 필요한 DTO
export const InsertMissionDTO = (body,time) => {
    console.log("body11:", body)
    return {
        storeId : body.store_id,
        reward : body.reward,
        deadline : body.deadline,
        missionspec : body.mission_spec,
        createdAt : time,
        updatedAt : time,
    };
};
// 멤버가 미션을 추가하는데 필요한 DTO
export const InsertMemberMissionDTO = (body,time) => {
    console.log("body11:", body)
    return {
        memberId : body.member_id,
        missionId : body.mission_id,
        status : body.status,
        createdAt : time,
        updatedAt : time,
    };
};