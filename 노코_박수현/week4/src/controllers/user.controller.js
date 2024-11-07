import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserAgree, bodyToMissionComplete } from "../dtos/user.dto.js";
import { userSignUp, userAgreeAddition, listUserReviews, listUserMissions, CompleteUserMission } from "../services/user.service.js";

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

// 내가 작성한 리뷰 목록 불러오기
export const handleListUserReviews = async (req, res, next) => {
    const reviews = await listUserReviews(
        parseInt(req.params.memberId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviews });
};

// 내가 진행 중인 미션 목록 불러오기
export const handleListUserMissions = async (req, res, next) => {
    const missions = await listUserMissions(
        parseInt(req.params.memberId),
        req.query.status,
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: missions });
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기
export const handleUserMissionComplete = async (req, res, next) => {
    const missions = await CompleteUserMission(bodyToMissionComplete(req.body),
        parseInt(req.params.memberId),
        parseInt(req.params.missionId)
    );
    res.status(StatusCodes.OK).json({ result: missions });
};