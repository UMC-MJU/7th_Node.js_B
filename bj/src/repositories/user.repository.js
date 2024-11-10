import { pool,prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  console.log("body13: ", data);
  try {
    const member = await prisma.member.findFirst({ where : { email: data.email }});
    if (member){
      return null;
    }
    const created = await prisma.member.create({ data : data })
    return created.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};
// 사용자 정보 얻기
export const getUser = async (memberId) => {
  console.log("body13: ", memberId);
  try {
    const user = await prisma.member.findFirstOrThrow({ where: { id: memberId } });
    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (memberId, foodCategoryId) => {
  console.log("body13: ", memberId, foodCategoryId);
  try {
    await prisma.memberPrefer.create({
      data: {
        memberId: memberId,
        foodCategoryId: foodCategoryId,
      },
    });
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (memberId) => {
  console.log("body13: ", memberId);
  try {
    const preferences = await prisma.memberPrefer.findMany({
      select: {
        id: true,
        memberId: true,
        foodCategoryId: true,
        foodCategory: true,
      },
      where: { memberId: memberId },
      orderBy: { foodCategoryId: "asc" },
    });
  
    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

//가게 생성 삽입
export const addStore = async (data) => {
  console.log("body13:", data)
  try {
    const created = await prisma.store.create({ data : data })
    return created.id;
  } catch (err) {
      throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
  }
}


// 리뷰 데이터 생성
export const addReview = async (data) => {
  console.log("body13:", data)
  console.log(data.storeId);
  try{
    const store = await prisma.store.findFirst({ where : { id: data.storeId }});
    if (!store){
      return null;
    }
    const created = await prisma.review.create({ data : data });
    return created.id;
  } catch(err){
      throw new Error(`오류가 발생하였습니다.`);
  }
};


//미션 데이터 삽입
export const addMission = async (data) => {
    console.log("body13:", data)
      console.log(data.storeId);
    try {
      const store = await prisma.store.findFirst({ where : { id: data.storeId }});
      if (!store){
        return null;
      }
      const created = await prisma.mission.create({ data: data });
      return created.id;
    } catch (err) {
        throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}

// 멤버 미션 추가하기
export const addMemberMission = async (data) => {
  console.log("body13:", data)
  try {
    const created = await prisma.memberMission.create({ data: data });
    return created.id;
  } catch (err) {
      throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
  }
}

// 가게 리뷰 가져오는 repository
export const getAllStoreReviews = async (storeId) => {
  console.log("body13:", storeId)
  try{
    const reviews = await prisma.userStoreReview.findMany({
      select: { id: true, content: true, store: true, user: true },
      where: { storeId: storeId, id: { gt: cursor } },
      orderBy: { id: "asc" },
      take: 5,
    });
  
    return reviews;
  }catch{
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
  }
};