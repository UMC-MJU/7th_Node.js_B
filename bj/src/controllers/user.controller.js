import { StatusCodes } from "http-status-codes";
import { bodyToUser, InsertReviewDTO, InsertMissionDTO ,InsertMemberMissionDTO} from "../dtos/user.dto.js";
import { userSignUp, InsertReviewService, InsertMissionService ,InsertMemberMissionService} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

// 리뷰를 생성하는 컨트롤러
export const InsertReviewController = async (req, res, next) => {
  try {
    const time = new Date();
    console.log("리뷰가 생성되었습니다.");
    console.log("body: ", req.body);
    const reviewData = InsertReviewDTO(req.body,time);
    const review = await InsertReviewService(reviewData);
    res.status(StatusCodes.OK).json({ result: review });
  } catch (error) {
    console.error("Error occurred while creating review: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '리뷰 생성 중 오류가 발생했습니다.' });
  }
};

//  미션을 생성하는 컨트롤러
export const InsertMissionController = async (req, res, next) => {
  try {
    const time = new Date();
    console.log("가게의 미션을 생성합니다.");
    console.log("body:", req.body);
    const mission = await InsertMissionService(InsertMissionDTO(req.body,time));
    res.status(StatusCodes.OK).json({ result: mission });
  } catch (error){
    console.error("Error occurred while creating mission: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '미션 생성 중 오류가 발생했습니다.' });
  }
};

// 멤버가 미션을 추가하는 컨트롤러
export const InsertMemberMissionController = async (req, res, next) => {
  try {
    const time = new Date();
    console.log("해당 멤버 미션에 가게의 미션을 추가합니다.");
    console.log("body:", req.body);
    const Membermission = await InsertMemberMissionService(InsertMemberMissionDTO(req.body,time));
    res.status(StatusCodes.OK).json({ result: Membermission });
  } catch (error){
    console.error("Error occurred while creating member_mission: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '멤버가 미션을 추가하던 중 오류가 발생했습니다.' });
  }
};
