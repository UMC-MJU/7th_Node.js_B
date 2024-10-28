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

export const bodyToReview = (body) => {

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
        store: body.store,
        review: body.review,
    };
};