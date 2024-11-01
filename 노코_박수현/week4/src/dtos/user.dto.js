export const bodyToUser = (body) => {
    // const birth = new Date(body.birth);

    return {
        name: body.name,
        gender: body.gender,
        age: body.age,
        address: body.address || "",
        spec_address: body.spec_address || "",
        phone_num: body.phone_num,
        status: body.status,
        email: body.email,
        point: body.point,
        preferences: body.preferences,
    };
};
export const responseFromUser = (body) => {
    return {
        user: body.user,
        preferences: body.preferences,
    };
};