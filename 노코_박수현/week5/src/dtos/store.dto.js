// 가게 추가
export const bodyToStore = (body) => {

    return {
        region_id: body.region_id,
        name: body.name,
        address: body.address,
        score: body.score,
        region_name: body.region_name,
    };
};

export const responseFromStore = (body) => {
    return {
        store: body.store,
        region: body.region,
    };
};

// 가게 리뷰 추가
export const bodyToStoreReview = (body) => {

    return {
        member_id: body.member_id,
        store_id: body.store_id,
        body: body.body,
        score: body.score,
        reviewImages: body.reviewImages,
    };
};

export const responseFromStoreReview = (body) => {
    return {
        review: body.review,
        reviewImages: body.reviewImages,
    };
};

// 가게 미션 추가
export const bodyToStoreMission = (body) => {
    const deadline = new Date(body.deadline);
    return {
        store_id: body.store_id,
        reward: body.reward,
        deadline,
        mission_spec: body.mission_spec,
    };
};

export const responseFromStoreMission = (body) => {
    return {
        mission: body.mission,
    };
};