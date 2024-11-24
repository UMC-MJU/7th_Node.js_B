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
              age: { type: "number" },
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

  /* 
    #swagger.summary = '유저 미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId: { type: "string", description: "멤버 ID", example: "1"},
              missionId: { type: "stirng", description: "추가할 미션 ID", example: "123"},
              status: { type: "string", description: "미션 상태", example: "진행 중"}
            }
          }  
        }
      }
    };

    #swagger.responses[200] = {
      description: "유저 미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  missionId: { type: "string", description: "추가된 미션 ID", example: "123" },
                  memberId: { type: "string", description: "멤버 ID", example: "1" }
                }
              }  
            }
          }  
        }
      }
    }

    #swagger.responses[400] = {
      description: "유저 미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                oneOf: [
                  {
                    type: "object",
                    properties: {
                      errorCode: { type: "string", example: "U002"},
                      reason: { type: "string", example: "중복된 미션 ID입니다."},
                      data: { type: "object", nullable: true, example: null}
                    }
                  },
                  {
                    type: "object",
                    properties: {
                      errorCode: { type: "string", example: "U003" },
                      reason: { type: "string", example: "없는 미션입니다." },
                      data: { type: "object", nullable: true, example: null } 
                    }
                  }
                ]
              },
              success: { type: "object", nullable: true, example: null}
            }
          }
        }
      }
    };

  */

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

  /*
    #swagger.summary = '유저 리뷰 목록 조회 API';
    #swagger.parameters['memberId'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: '사용자 ID',
      example: 1
    };
    
    #swagger.parameters['cursor'] = {
      in: 'query',
      type: 'string',
      description: '리뷰 조회 커서',
      example: 0
    };
    
    #swagger.responses[200] = {
      description: "유저 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "리뷰 ID", example: 1 },
                        storeId: { type: "string", description: "가게 ID", example: 1 },
                        body: { type: "string", description: "리뷰 내용", example: "좋아요!" },
                        score: { type: "number", format: "float", description: "리뷰 점수", example: 3.5 }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "string", description: "다음 조회 시작점", example: 2 }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "유저 리뷰 목록 조회 실패 응답 (리뷰가 없을 때)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U004"},
                  reason: { type: "string", example: "리뷰를 찾을 수 없습니다."},
                  data: { type: "object", nullable: true, example: null }
                }
              },
              success: { type: "object", nullable: true, example: null}
            }
          }  
        }  
      }  
    }
  */

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

  /*
  #swagger.summary = '진행중인 미션 목록 조회 API';
  #swagger.parameters['memberId'] = {
    in: 'path',
    type: 'integer',
    required: true,
    description: '사용자 ID',
    example: 1
  };

  #swagger.parameters['status'] = {
    in: 'query',
    type: 'string',
    required: false,
    description: '미션 상태 (진행중)',
    example: '진행중'
  };

  #swagger.parameters['cursor'] = {
    in: 'query',
    type: 'string',
    description: '미션 조회 커서',
    example: 0
  };

  #swagger.responses[200] = {
    description: "진행중인 미션 목록 조회 성공 응답",
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
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      missionId: { type: "string", description: "미션 ID", example: 1 },
                      status: { type: "string", description: "미션 상태", example: "진행중" }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "string", description: "다음 조회 시작점", example: 2 }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
*/

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
  /*
    #swagger.summary = '진행중인 미션 완료 API';
    #swagger.parameters['memberId'] = {
      in: 'path',
      type: 'stirng',
      required: true,
      description: '사용자 ID',
      example: 1
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: '미션 ID',
      example: 1
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", description: "미션 완료 상태", example: "진행 완료" }
            }
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "진행중인 미션 완료 성공 응답",
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
                  missionId: { type: "string", description: "완료된 미션 ID", example: 2 },
                  status: { type: "string", description: "완료된 상태", example: "진행완료" }
                }
              }
            }
          }
        }
      }
    };
  */

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