// 회원가입
// 도전중인 미션에 추가
// 내가 작성한 리뷰 목록 얻기
// 내가 진행중인 미션 목록 얻기
// 내가 진행중인 미션을 진행완료로 바꾸기

import { StatusCodes } from "http-status-codes";
import {
  bodyToUser,
  bodyToUserAddMission,
  bodyToUserMissionComplete
} from "../dtos/user.dto.js";
import {
  userSignUp,
  userAddMission,
  userReviewList,
  userOngoingMissionList,
  userMissionToComplete
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const user = await userSignUp(bodyToUser(req.body));

    return res.status(StatusCodes.OK).success(user);
  } catch (err) {
    console.error("회원가입 중 에러 발생:", err.message);
    return next(err);
  }

};

export const handleAddUserMission = async (req, res, next) => {
  try {
    console.log("도전중인 미션에 추가합니다.");
    console.log("body:", req.body);

    const userMissionData = bodyToUserAddMission(req.body);
    const newUserMission = await userAddMission(userMissionData);

    return res.status(StatusCodes.OK).success(newUserMission);

  } catch (err) {
    console.error("도전미션 추가 중 에러 발생");
    return next(err);
  }

}

export const handleUserReviewList = async (req, res, next) => {
  try {
    console.log("내가 작성한 리뷰 목록을 불러옵니다.");
    const userReview = await userReviewList(
      parseInt(req.params.memberId),
      typeof req.query.cursor === "string" ? parseInt(req.qurey.cursor) : 0
    );
    return res.status(StatusCodes.OK).success(userReview);
  } catch (err) {
    console.error("나의 리뷰를 불러오지 못했습니다.");
    return next(err);
  }

}

export const handleUserOngoingMissionList = async (req, res, next) => {
  try {
    console.log("현재 진행중인 미션 목록을 불러옵니다.");
    const ongoingMissions = await userOngoingMissionList(
      parseInt(req.params.memberId),
      req.query.status,
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    return res.status(StatusCodes.OK).success(ongoingMissions);
  } catch (err) {
    console.error("진행중인 미션 목록 확인 불가");
    return next(err);
  }

}

export const handleUserMissionComplete = async (req, res, next) => {
  try {
    const missions = await userMissionToComplete(bodyToUserMissionComplete(req.body),
      parseInt(req.params.memberId),
      parseInt(req.params.missionId)
    )
    return res.status(StatusCodes.OK).success(missions);
  } catch (err) {
    return next(err);
  }

}