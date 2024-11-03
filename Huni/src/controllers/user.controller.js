import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToReview, bodyToMission, bodyToUserMission } from "../dtos/user.dto.js";
import { userSignUp, ReviewMake, MissionMake, UserMissionMake } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

// export const handleStoreMission = async(req, res, next) => {
//     console.log("미션이 생성되었습니다.");
//     console.log("body: ", req.body);

//     const mission = await missionMake(bodyToMission(req.body));
//     res.status(StatusCodes.OK).json({result: mission});
// }

export const handleStoreReview = async (req, res, next) => {
    try {
        console.log("리뷰가 생성되었습니다.");
        console.log("body: ", req.body);

        const reviewData = bodyToReview(req.body);
        const review = await ReviewMake(reviewData);
        res.status(StatusCodes.OK).json({ result: review });
    } catch (error) {
        console.error("Error occurred while creating mission: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '리뷰 생성 중 오류가 발생했습니다.' });
    }
};

//미션 생성
export const handleStoreMission = async (req, res, next) => {
    try{
        console.log("미션을 생성합니다.");
        console.log("body:", req.body);

        const mission = await MissionMake(bodyToMission(req.body));
        res.status(StatusCodes.OK).json({result: mission});
    }catch(error){
        console.error(error);
    }
};

export const handleUserMission = async(req, res, next) =>{
    try{
        console.log("도전 시작");
        console.log("body:", req.body);

        const mission = await UserMissionMake(bodyToUserMission(req.body));
        res.status(StatusCodes.OK).json({result: mission});
    } catch(error){
        console.error(error);
    }
}