import { responseFromStore } from "../dtos/store.dto.js";;
import {
    addStore,
    getStore,
    getRegionByRegionId,
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