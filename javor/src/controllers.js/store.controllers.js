// 가게를 추가
// 가게에 미션 추가
// 가게에 리뷰 추가
// 가게 리뷰 얻기
// 특정 가게 미션 얻기


import { StatusCodes } from "http-status-codes";
import {
    bodyToStore,
    bodyToStoreMission,
    bodyToStoreReview
} from "../dtos/store.dto.js";
import {
    storeAdd,
    storeMissionAdd,
    storeReviewAdd,
    storeReviewList,
    storeMissionList
} from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {

    /*
        #swagger.summary = '가게 추가 API';
        #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        regionId: { type: "number", description: "지역 ID", example: 2 },
                        name: { type: "string", description: "가게 이름", example: "명진당" },
                        address: { type: "string", description: "가게 주소", example: "처인구 역북동" },
                        score: { type: "number", format: "float", description: "가게 초기 점수", example: 4.5 }
                        }
                    }
                }
            }
        };

        #swagger.responses[200] = {
        description: "가게 추가 성공",
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
                                storeId: { type: "number", description: "생성된 가게 ID", example: 123 }
                                }
                            }
                        }
                    }
                }
            }
        };

        #swagger.responses[404] = {
        description: "가게 추가 실패(지역x)",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U006" },
                                reason: { type: "string", example: "지역이 존재하지 않습니다." },
                                data: { type: "object", nullable: true, example: null }
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
        console.log("가게를 추가합니다.");
        console.log("body:", req.body);

        const storeData = bodyToStore(req.body);
        const newStore = await storeAdd(storeData);

        return res.status(StatusCodes.OK).success(newStore);;
    } catch (err) {
        console.error("가게 추가 오류");
        return next(err);
    }


}

export const handleStoreMissionAdd = async (req, res, next) => {

    /*
        #swagger.summary = '가게 미션 추가 API';
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            storeId: { type: "number", description: "가게 ID", example: 1 },
                            reward: { type: "number", description: "보상", example: 1000 },
                            deadline: { type: "string", format: "date", description: "미션 마감일", example: "2024-11-24" },
                            missionSpec: { type: "string", description: "미션 상세 설명", example: "가게 방문 후 리뷰 작성" }
                        }
                    }
                }
            }
        };
    
        #swagger.responses[200] = {
          description: "가게 미션 추가 성공",
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
                                missionId: { type: "number", description: "생성된 미션 ID", example: 456 }
                            }
                        }
                    }
                }
            }
          }
        };
        
        #swagger.responses[404] = {
            description: "가게 미션 추가 실패(가게x)",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "U007" },
                                    reason: { type: "string", example: "가게가 존재하지 않습니다." },
                                    data: { type: "object", nullable: true, example: null }
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
        console.log("가게에 미션을 추가합니다.");
        console.log("body:", req.body);

        const storeMissionData = bodyToStoreMission(req.body);
        const newStoreMission = await storeMissionAdd(storeMissionData);

        return res.status(StatusCodes.OK).success(newStoreMission);
    } catch (err) {
        console.error("가게 미션 추가 오류");
        return next(err);
    }

}

export const handleStoreReviewAdd = async (req, res, next) => {

    /*
        #swagger.summary = '가게 리뷰 추가 API';
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            memberId: { type: "string", description: "멤버 ID", example: 1 },
                            storeId: { type: "string", description: "가게 ID", example: 1 },
                            body: { type: "string", description: "리뷰 내용", example: "정말 맛있어요!" },
                            score: { type: "number", format: "float", description: "리뷰 점수", example: 4.5 }
                        }
                    }
                }
            }
        };

            #swagger.responses[200] = {
            description: "가게 리뷰 추가 성공",
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
                                        reviewId: { type: "stirng", description: "추가된 리뷰 ID", example: 11 }
                                    }
                                }
                            }
                        }
                    }
                }
            };
        #swagger.responses[404] = {
            description: "가게 리뷰 추가 실패(가게x)",
            content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                resultType: { type: "string", example: "FAIL" },
                                error: {
                                    type: "object",
                                    properties: {
                                    errorCode: { type: "string", example: "U007" },
                                    reason: { type: "string", example: "가게가 존재하지 않습니다." },
                                    data: { type: "object", nullable: true, example: null }
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
        console.log("가게에 리뷰를 추가합니다.");
        console.log("body", req.body);

        const StoreReviewData = bodyToStoreReview(req.body);
        const newStoreReview = await storeReviewAdd(StoreReviewData);

        return res.status(StatusCodes.OK).success(newStoreReview);
    } catch (err) {
        console.error("가게 리뷰 추가 오류");
        return next(err);
    }
}

export const handleStoreReviewsList = async (req, res, next) => {

    /*
#swagger.summary = '가게 리뷰 목록 조회 API';
#swagger.responses[200] = {
 description: "가게 리뷰 목록 조회 성공 응답",
 content: {
   "application/json": {
     schema: {
       type: "object",
       properties: {
         resultType: { type: "string", example: "Success" },
         error: { type: "object", nullable: true, example: null },
         success: {
           type: "object",
           properties: {
             data: {
               type: "array",
               items: {
                 type: "object",
                 properties: {
                   id: { type: "string" },
                   store: { type: "object", properties: { id: { type: "string" }, name: { type: "string" } } },
                   user: { type: "object", properties: { id: { type: "stirng" }, email: { type: "string" }, name: { type: "string" } } },
                   content: { type: "string" }
                 }
               }
             },
             pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
           }
         }
       }
     }
   }
 }
};
*/
    try {

        const reviews = await storeReviewList(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        return res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        console.error("가게 리뷰를 불러올 수 없음");
        return next(err);
    }

};

export const handleStoreMissionsList = async (req, res, next) => {

    /*
        #swagger.summary = '가게 미션 목록 조회 API';
        #swagger.parameters['storeId'] = {
            in: 'path',
            type: 'number',
            required: true,
            description: '가게 ID',
            example: 1
        };

        #swagger.parameters['cursor'] = {
            in: 'query',
            type: 'number',
            description: '미션 조회 커서',
            example: 0
        };

        #swagger.responses[200] = {
            description: "가게 미션 목록 조회 성공",
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
                                                id: { type: "string", description: "미션 ID", example: 1 },
                                                reward: { type: "number", description: " 보상", example: 1000 },
                                                deadline: { type: "string", format: "date", description: "미션 마감일", example: "2024-11-24" },
                                                missionSpec: { type: "string", description: "미션 상세 설명", example: "리뷰 작성 미션" }
                                            }
                                        }
                                    },
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            cursor: { type: "number", nullable: true, example: 2 }
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
      description: "가게 미션 목록 조회 실패(정보x)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U008" },
                  reason: { type: "string", example: "정보를 불러올 수 없습니다." },
                  data: { type: "object", nullable: true, example: null }
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
        const missions = await storeMissionList(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        return res.status(StatusCodes.OK).success(missions);
    } catch (err) {
        console.error("가게 미션 목록을 불러올 수 없음");
        return next(err);
    }

};



