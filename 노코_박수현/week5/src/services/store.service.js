import {
    responseFromStore,
    responseFromStoreReview
} from "../dtos/store.dto.js";;
import {
    addStore,
    getStore,
    getRegionByRegionId,
    addStoreReview,
    getStoreReview,
    getStoreReviewImageByReviewId,
    setStoreReviewImage,
} from "../repositories/store.repository.js";

export const storeAddition = async (data) => {
    const additionStoreId = await addStore({
        region_id: data.region_id,
        name: data.name,
        address: data.address,
        score: data.score,
    });

    const store = await getStore(additionStoreId);
    const storeRegion = await getRegionByRegionId(data.region_id);

    return responseFromStore(
        {
            store,
            storeRegion
        });
};
export const storeReviewAddition = async (data) => {
    const additionReviewId = await addStoreReview({
        member_id: data.member_id,
        store_id: data.store_id,
        body: data.body,
        score: data.score,

    });

    if (additionReviewId === null) {
        throw new Error("가게가 존재하지 않습니다.");
    }

    for (const reviewImage of data.reviewImages) {
        await setStoreReviewImage(additionReviewId, data.store_id, reviewImage);
    }

    const review = await getStoreReview(additionReviewId);
    const reviewImages = await getStoreReviewImageByReviewId(additionReviewId);

    return responseFromStoreReview(
        {
            review,
            reviewImages,
        });
};