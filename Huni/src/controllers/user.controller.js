import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToReview, bodyToMission, bodyToUserMission } from "../dtos/user.dto.js";
import { 
    userSignUp, 
    ReviewMake, 
    MissionMake, 
    UserMissionMake, 
    listStoreReviews,
    listUserReviews,
    listStoreMissions,
    listUserMissions
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              address: { type: "string" },
              specAddress: { type: "string" },
              phoneNum: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};


export const handleStoreReview = async (req, res, next) => {
    /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userid: { type: "number", example: 1 },
              storeid: { type: "number", example: 101 },
              body: { type: "string", example: "Great place!" },
              score: { type: "number", example: 5 }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 작성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: { type: "number"}
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
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
    /*
    #swagger.summary = '미션 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeid: { type: "number", example: 101 },
              reward: { type: "string", example: "Free Coffee" },
              deadline: { type: "string", example: "2023-12-31T23:59:59.000Z" },
              missionspec: { type: "string", example: "Complete 10 visits" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 생성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: { type: "number", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
    try{
        console.log("미션을 생성합니다.");
        console.log("body:", req.body);

        const mission = await MissionMake(bodyToMission(req.body));
        res.status(StatusCodes.OK).json({result: mission});
    }catch(error){
        console.error(error);
    }
};

//사용자 미션 시작 api
export const handleUserMission = async(req, res, next) =>{
    /*
    #swagger.summary = '사용자 미션 참여 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userid: { type: "number", example: 1 },
              missionid: { type: "number", example: 200 },
              storeid: { type: "number", example: 101 }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 참여 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: { type: "number", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 불가능 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
    try{
        console.log("도전 시작");
        console.log("body:", req.body);

        const mission = await UserMissionMake(bodyToUserMission(req.body));
        res.status(StatusCodes.OK).json({result: mission});
    } catch(error){
        console.error(error);
    }
}

//가게 리뷰 받아오는 api
export const handleListStoreReviews = async (req, res, next) => {
    /*
    #swagger.summary = '가게 리뷰 목록 조회 API';
    #swagger.parameters['storeid'] = {
      in: 'query',
      required: true,
      description: '조회할 가게 ID',
      schema: { type: 'number', example: 101 }
    };
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                userid: { type: "number", example: 1 },
                username: { type: "string", example: "Jane Doe" },
                body: { type: "string", example: "맛있어요!" },
                score: { type: "number", example: 5 }
              }
            }
          }
        }
      }
    };
    */
    try{
        const reviews = await listStoreReviews(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json({result: reviews});
    }catch(error){
        console.error(error);
    }
};

//유저 리뷰 get api
export const handleUserReviews = async (req, res, next) => {
    /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.parameters['userid'] = {
      in: 'query',
      required: true,
      description: '조회할 사용자 ID',
      schema: { type: 'number', example: 1 }
    };
    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                storeid: { type: "number", example: 101 },
                storename: { type: "string", example: "손맛한식" },
                body: { type: "string", example: "가성비 좋아요" },
                score: { type: "number", example: 4 }
              }
            }
          }
        }
      }
    };
    */
    try{
        const reviews = await listUserReviews(
            parseInt(req.params.memberId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json({result: reviews});
    }catch(error){
        console.error(error);
    }
};

//가게 미션 get api
export const handleListStoreMissions = async (req, res, next) => {
    /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.parameters['storeid'] = {
      in: 'query',
      required: true,
      description: '조회할 가게 ID',
      schema: { type: 'number', example: 101 }
    };
    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                missionid: { type: "number", example: 33 },
                reward: { type: "string", example: "1500" },
                deadline: { type: "string", example: "2023-12-31T23:59:59.000Z" },
                missionspec: { type: "string", example: "2번 이상 방문하세요" }
              }
            }
          }
        }
      }
    };
    */
    try{
        const missions = await listStoreMissions(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json({result: missions});
    }catch(error){
        console.error(error);
    }
};

//유저 미션(진행중) get api
export const handleListUserMissions = async (req, res, next) => {
    /*
    #swagger.summary = '사용자 미션 목록 조회 API';
    #swagger.parameters['userid'] = {
      in: 'query',
      required: true,
      description: '조회할 사용자 ID',
      schema: { type: 'number', example: 1 }
    };
    #swagger.responses[200] = {
      description: "사용자 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                missionid: { type: "number", example: 200 },
                storename: { type: "string", example: "빽다방" },
                reward: { type: "string", example: "500" },
                status: { type: "string", example: "진행중" }
              }
            }
          }
        }
      }
    };
    */
    try{
        const missions = await listUserMissions(
            parseInt(req.params.memberId),
            req.params.status,
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json({result: missions});
    }catch(error){
        console.error(error);
    }
};