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