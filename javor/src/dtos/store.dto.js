export const bodyToStore = (body) => {

    return {
        region_id: body.region_id,
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
        store_id: body.store_id,
        reward: body.reward,
        deadline,
        mission_spec: body.mission_spec,
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
        member_id: body.member_id,
        store_id: body.store_id,
        body: body.body,
        score: body.score,
    };
};

export const responseFromStoreReview = (body) => {

    return {
        body: body.ReviewStore
    };
};