export const bodyToStore = (body) => {

    return {
        member_id: body.member_id,
        store_id: body.store_id,
        body: body.body,
        score: body.score,
        reviewImages: body.reviewImages,
    };
};
export const responseFromStore = (body) => {
    return {
        store: body.store,
        review: body.review,
    };
};