// 회원가입
// 도전중인 미션에 추가


import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import { userSignUp, userAddMission } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddUserMission = async (req, res, next) => {

  console.log("도전중인 미션에 추가합니다.");
  console.log("body:", req.body);

  const userMissionData = bodyToUserMission(req.body);
  const newUserMission = await userAddMission(userMissionData);

  res.status(StatusCodes.OK).json({ result: newUserMission });

}
