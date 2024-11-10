export const bodyToStore = (body) => {

    return {
        regionId: body.regionId,
        name: body.name,
        address: body.address,
        score: body.score,
    };
};

export const responseFromStore = (body) => {

    return {
        body: body.Store
    };
};

export const bodyToStoreMission = (body) => {
    const deadline = new Date(body.deadline);

    return {
        storeId: body.storeId,
        reward: body.reward,
        deadline,
        missionSpec: body.missionSpec,
    };
    ;
}

export const responseFromStoreMission = (body) => {

    return {
        body: body.MissionStore
    };
};

export const bodyToStoreReview = (body) => {

    return {
        memberId: body.memberId,
        storeId: body.storeId,
        body: body.body,
        score: body.score,
    };
};

export const responseFromStoreReview = (body) => {

    return {
        body: body.ReviewStore
    };
};

// 가게 리뷰 불러오기
export const responseFromStoreReviewGet = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};

export const responseFromStoreMissionGet = (missions) => {
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    };
};