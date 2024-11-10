import { StatusCodes } from "http-status-codes";
import { bodyToUser, InsertStoreDTO, InsertReviewDTO, InsertMissionDTO ,InsertMemberMissionDTO} from "../dtos/user.dto.js";
import { userSignUp, InsertStoreService, InsertReviewService, InsertMissionService ,InsertMemberMissionService, listStoreReviewsService} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

//  특정 지역의 가게를 생성하는 컨트롤러
export const InsertStoreController = async (req, res, next) => {
  try {
    console.log("가게의 미션을 생성합니다.");
    console.log("body:", req.body);
    const store = await InsertStoreService(InsertStoreDTO(req.body));
    res.status(StatusCodes.OK).json({ result: store });
  } catch (error){
    console.error("Error occurred while creating store: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '가게 생성 중 오류가 발생했습니다.' });
  }
};

// 리뷰를 생성하는 컨트롤러
export const InsertReviewController = async (req, res, next) => {
  try {
    console.log("리뷰가 생성되었습니다.");
    console.log("body: ", req.body);
    const reviewData = InsertReviewDTO(req.body);
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
    console.log("가게의 미션을 생성합니다.");
    console.log("body:", req.body);
    const mission = await InsertMissionService(InsertMissionDTO(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
  } catch (error){
    console.error("Error occurred while creating mission: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '미션 생성 중 오류가 발생했습니다.' });
  }
};

// 멤버가 미션을 추가하는 컨트롤러
export const InsertMemberMissionController = async (req, res, next) => {
  try {
    console.log("해당 멤버 미션에 가게의 미션을 추가합니다.");
    console.log("body:", req.body);
    const Membermission = await InsertMemberMissionService(InsertMemberMissionDTO(req.body));
    res.status(StatusCodes.OK).json({ result: Membermission });
  } catch (error){
    console.error("Error occurred while creating member_mission: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '멤버가 미션을 추가하던 중 오류가 발생했습니다.' });
  }
};

// 가게의 리뷰를 가져오는 컨트롤러
export const GetListStoreReviewsController = async (req, res, next) => {
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch (error){
    console.error("Error occurred while get review: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '가게의 리뷰를 가져오던 중 오류가 발생했습니다.' });
  }
};
