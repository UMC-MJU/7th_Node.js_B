// 유저 회원 가입
export const bodyToUser = (body) => {

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

// 유저 약관 동의
export const bodyToUserAgree = (body) => {

    return {
        member_id: body.member_id,
        terms: body.terms,
    };
};

export const responseFromUserAgree = (body) => {
    return {
        userAgree: body.userAgree,
    };
};