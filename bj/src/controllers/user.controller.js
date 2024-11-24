import { StatusCodes } from "http-status-codes";
import { bodyToUser, 
  InsertStoreDTO, 
  InsertReviewDTO, 
  InsertMissionDTO ,
  InsertMemberMissionDTO
} from "../dtos/user.dto.js";
import { userSignUp, 
  InsertStoreService, 
  InsertReviewService, 
  InsertMissionService ,
  InsertMemberMissionService, 
  listStoreReviewsService, 
  listStoreMissionService,
  listMemberReviewsService,
  listMemberMissionService
} from "../services/user.service.js";

// 유저의 회원가입 해주는 컨트롤러
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
            email: { type: "string", description: "사용자 이메일", example: "user@example.com" },
            age: { type: "integer", description: "사용자 나이", example: 25 },
            name: { type: "string", description: "사용자 이름", example: "홍길동" },
            gender: { type: "string", description: "사용자 성별 (male, female, other)", example: "male" },
            address: { type: "string", description: "사용자 주소", example: "서울특별시 강남구" },
            specAddress: { type: "string", description: "상세 주소", example: "강남대로 123" },
            phoneNum: { type: "string", description: "사용자 전화번호", example: "010-1234-5678" },
            preferences: { 
              type: "array", 
              description: "음식 선호 카테고리 ID 배열", 
              items: { type: "integer" },
              example: [1, 2, 3] 
            }
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
                email: { type: "string", description: "등록된 사용자 이메일", example: "user@example.com" },
                name: { type: "string", description: "등록된 사용자 이름", example: "홍길동" },
                preferCategory: { 
                  type: "array", 
                  description: "등록된 음식 선호 카테고리 이름 목록", 
                  items: { type: "string" },
                  example: ["한식", "양식", "일식"]
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
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
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[409] = {
    description: "이미 존재하는 사용자 이메일",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U002" },
                reason: { type: "string", description: "이미 존재하는 이메일입니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  }catch(err){
    return next(err);
  }
};

//  특정 지역의 가게를 생성하는 컨트롤러
export const InsertStoreController = async (req, res, next) => {
  /*
  #swagger.summary = '특정 지역의 가게 생성 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            region_id: { type: "integer", description: "지역 ID", example: 101 },
            name: { type: "string", description: "가게 이름", example: "홍길동 식당" },
            address: { type: "string", description: "가게 주소", example: "서울특별시 강남구 강남대로 123" },
            score: { type: "number", format: "float", description: "가게 평점", example: 4.5 }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "가게 생성 성공 응답",
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
                storeId: { type: "integer", description: "생성된 가게 ID", example: 202 }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("가게의 미션을 생성합니다.");
    console.log("body:", req.body);
    const store = await InsertStoreService(InsertStoreDTO(req.body));
    res.status(StatusCodes.OK).success(store);
  }catch(err){
    return next(err);
  }
};

// 리뷰를 생성하는 컨트롤러
export const InsertReviewController = async (req, res, next) => {
  /*
  #swagger.summary = '가게 리뷰 생성 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            member_id: { type: "integer", description: "작성자(회원) ID", example: 1 },
            store_id: { type: "integer", description: "리뷰 대상 가게 ID", example: 202 },
            body: { type: "string", description: "리뷰 내용", example: "음식이 정말 맛있어요!" },
            score: { type: "number", format: "float", description: "리뷰 평점 (0~5)", example: 4.5 }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "리뷰 생성 성공 응답",
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
                reviewId: { type: "integer", description: "생성된 리뷰 ID", example: 1234 }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "리뷰 작성 대상(가게 또는 회원)이 존재하지 않을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R404" },
                reason: { type: "string", description: "가게 또는 회원 정보가 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    const reviewData = InsertReviewDTO(req.body);
    const review = await InsertReviewService(reviewData);
    res.status(StatusCodes.OK).success(review);
  }catch(err){
    return next(err);
  }
};

//  미션을 생성하는 컨트롤러
export const InsertMissionController = async (req, res, next) => {
  /*
  #swagger.summary = '가게 미션 생성 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            store_id: { type: "integer", description: "미션 대상 가게 ID", example: 202 },
            reward: { type: "number", description: "미션 보상 금액", example: 10000 },
            deadline: { type: "string", format: "date-time", description: "미션 마감일", example: "2024-12-31T23:59:59Z" },
            mission_spec: { type: "string", description: "미션 세부 내용", example: "가게 리뷰 5개 작성" }
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
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                missionId: { type: "integer", description: "생성된 미션 ID", example: 1234 }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "미션 대상 가게가 존재하지 않을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M404" },
                reason: { type: "string", description: "가게 정보가 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("가게의 미션을 생성합니다.");
    console.log("body:", req.body);
    const mission = await InsertMissionService(InsertMissionDTO(req.body));
    res.status(StatusCodes.OK).success(mission);
  }catch(err){
    return next(err);
  }
};

// 멤버가 미션을 추가하는 컨트롤러
export const InsertMemberMissionController = async (req, res, next) => {
  /*
  #swagger.summary = '멤버 미션 추가 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            member_id: { type: "integer", description: "멤버 ID", example: 101 },
            mission_id: { type: "integer", description: "미션 ID", example: 202 },
            status: { type: "string", description: "미션 상태 (예: PENDING, COMPLETED)", example: "PENDING" }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "멤버 미션 추가 성공 응답",
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
                memberMissionId: { type: "integer", description: "생성된 멤버 미션 ID", example: 1234 }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MM001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "멤버 또는 미션 정보가 존재하지 않을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MM404" },
                reason: { type: "string", description: "멤버 또는 미션 정보를 찾을 수 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MM500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("해당 멤버 미션에 가게의 미션을 추가합니다.");
    console.log("body:", req.body);
    const Membermission = await InsertMemberMissionService(InsertMemberMissionDTO(req.body));
    res.status(StatusCodes.OK).success(Membermission);
  }catch(err){
    return next(err);
  }
};

// 특정 가게의 리뷰를 가져오는 컨트롤러
export const GetListStoreReviewsController = async (req, res, next) => {
      /*
  #swagger.summary = '특정 가게의 리뷰 리스트 API';
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    description: '가게의 고유 ID',
    schema: {
      type: 'integer',
      example: 101
    }
  };
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    description: '페이지네이션을 위한 커서 값. 마지막 리뷰 ID',
    schema: {
      type: 'integer',
      example: 0
    }
  };
  #swagger.responses[200] = {
    description: "특정 가게의 리뷰를 가져오는 데 성공한 응답",
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
                      id: { type: "integer", description: "리뷰 ID", example: 1 },
                      storeId: { type: "integer", description: "가게 ID", example: 101 },
                      memberId: { type: "integer", description: "멤버 ID", example: 202 },
                      body: { type: "string", description: "리뷰 내용", example: "맛있어요!" },
                      score: { type: "number", format: "float", description: "리뷰 점수", example: 4.5 }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: {
                      type: "integer",
                      description: "다음 페이지 요청을 위한 커서 값",
                      example: 5
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "SR001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "가게 정보 또는 리뷰가 없을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "SR404" },
                reason: { type: "string", description: "가게 또는 리뷰 정보를 찾을 수 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "SR500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("작업 시작했다.");
    const reviews = await listStoreReviewsService(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    console.log("작업 끝났다.");
    res.status(StatusCodes.OK).success(reviews);
  }catch(err){
    return next(err);
  }
};

// 특정 멤버의 리뷰를 가져오는 컨트롤러
export const GetListMemberReviewsController = async (req, res, next) => {
  /*
  #swagger.summary = '특정 멤버의 리뷰 리스트 API';
  #swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    description: '멤버의 고유 ID',
    schema: {
      type: 'integer',
      example: 202
    }
  };
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    description: '페이지네이션을 위한 커서 값. 마지막 리뷰 ID',
    schema: {
      type: 'integer',
      example: 0
    }
  };
  #swagger.responses[200] = {
    description: "특정 멤버의 리뷰를 가져오는 데 성공한 응답",
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
                      id: { type: "integer", description: "리뷰 ID", example: 1 },
                      memberId: { type: "integer", description: "멤버 ID", example: 202 },
                      storeId: { type: "integer", description: "가게 ID", example: 101 },
                      body: { type: "string", description: "리뷰 내용", example: "훌륭한 서비스였습니다." },
                      score: { type: "number", format: "float", description: "리뷰 점수", example: 4.7 }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: {
                      type: "integer",
                      description: "다음 페이지 요청을 위한 커서 값",
                      example: 5
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MR001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "멤버 정보 또는 리뷰가 없을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MR404" },
                reason: { type: "string", description: "멤버 또는 리뷰 정보를 찾을 수 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MR500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("작업 시작했다.");
    const reviews = await listMemberReviewsService(
      parseInt(req.params.memberId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    console.log("작업 끝났다.");
    res.status(StatusCodes.OK).success(reviews);
  }catch(err){
    return next(err);
  }
};

// 특정 가게의 미션를 가져오는 컨트롤러
export const GetListStoreMissionController = async (req, res, next) => {
  /*
  #swagger.summary = '특정 가게의 미션 리스트 API';
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    description: '가게의 고유 ID',
    schema: {
      type: 'integer',
      example: 101
    }
  };
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    description: '페이지네이션을 위한 커서 값. 마지막 미션 ID',
    schema: {
      type: 'integer',
      example: 0
    }
  };
  #swagger.responses[200] = {
    description: "특정 가게의 미션을 가져오는 데 성공한 응답",
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
                      id: { type: "integer", description: "미션 ID", example: 1 },
                      storeId: { type: "integer", description: "가게 ID", example: 101 },
                      reward: { type: "integer", description: "미션 보상", example: 500 },
                      deadline: { type: "string", format: "date-time", description: "미션 마감일", example: "2024-12-31T23:59:59Z" },
                      missionSpec: { type: "string", description: "미션 상세 설명", example: "특정 음식을 주문하고 리뷰를 작성하세요." }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: {
                      type: "integer",
                      description: "다음 페이지 요청을 위한 커서 값",
                      example: 5
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "SM001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "가게 정보 또는 미션이 없을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "SM404" },
                reason: { type: "string", description: "가게 또는 미션 정보를 찾을 수 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "SM500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("작업 시작했다.");
    const missions = await listStoreMissionService(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    console.log("작업 끝났다.");
    res.status(StatusCodes.OK).success(missions);
  }catch(err){
    return next(err);
  }
};

// 특정 멤버의 미션를 가져오는 컨트롤러
export const GetListMemberMissionController = async (req, res, next) => {
  /*
  #swagger.summary = '특정 멤버의 진행 중인 미션 리스트 API';
  #swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    description: '멤버의 고유 ID',
    schema: {
      type: 'integer',
      example: 42
    }
  };
  #swagger.parameters['status'] = {
    in: 'path',
    required: true,
    description: '미션 상태 (예: 진행 중)',
    schema: {
      type: 'string',
      example: 'in_progress'
    }
  };
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    description: '페이지네이션을 위한 커서 값. 마지막 미션 ID',
    schema: {
      type: 'integer',
      example: 0
    }
  };
  #swagger.responses[200] = {
    description: "특정 멤버의 진행 중인 미션을 가져오는 데 성공한 응답",
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
                      id: { type: "integer", description: "멤버 미션 ID", example: 10 },
                      memberId: { type: "integer", description: "멤버 ID", example: 42 },
                      missionId: { type: "integer", description: "미션 ID", example: 101 },
                      status: { type: "string", description: "미션 상태", example: "in_progress" },
                      mission: {
                        type: "object",
                        properties: {
                          id: { type: "integer", description: "미션 ID", example: 101 },
                          reward: { type: "integer", description: "미션 보상", example: 500 },
                          deadline: { type: "string", format: "date-time", description: "미션 마감일", example: "2024-12-31T23:59:59Z" },
                          missionSpec: { type: "string", description: "미션 상세 설명", example: "특정 음식을 주문하고 리뷰를 작성하세요." }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: {
                      type: "integer",
                      description: "다음 페이지 요청을 위한 커서 값",
                      example: 15
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MM001" },
                reason: { type: "string", description: "에러 이유" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: "멤버 정보 또는 미션이 없을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MM404" },
                reason: { type: "string", description: "멤버 또는 미션 정보를 찾을 수 없습니다." },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "서버 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "MM500" },
                reason: { type: "string", description: "서버 내부 오류" },
                data: { type: "object", nullable: true }
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
    console.log("작업 시작했다.");
    const missions = await listMemberMissionService(
      parseInt(req.params.memberId),
      // status가 진행 중인 미션을 가져와야 하기 때문
      req.params.status,
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    console.log("작업 끝났다.");
    res.status(StatusCodes.OK).success(missions);
  }catch(err){
    return next(err);
  }
};
