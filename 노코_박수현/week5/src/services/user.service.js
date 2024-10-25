import { responseFromUser } from "../dtos/user.dto.js";;
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
    const joinUserId = await addUser({
        name: data.name,
        gender: data.gender,
        age: data.age,
        address: data.address,
        spec_address: data.spec_address,
        phone_num: data.phone_num,
        status: data.status,
        email: data.email,
        point: data.point,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    // for (const preference of data.preferences) {
    //     await setPreference(joinUserId, preference);
    // }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({ user, preferences });
};