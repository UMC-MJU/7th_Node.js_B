import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserAgree } from "../dtos/user.dto.js";
import { userSignUp, userAgreeAddition } from "../services/user.service.js";

//유저 회원가입
export const handleUserSignUp = async (req, res, next) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({ result: user });
};

//유저 약관 동의
export const handleUserAgreeAddition = async (req, res, next) => {
    console.log("약관 동의를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userAgreeAddition(bodyToUserAgree(req.body));
    res.status(StatusCodes.OK).json({ result: user });
};