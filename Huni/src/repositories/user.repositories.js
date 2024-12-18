import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  try {
    const existingUser = await prisma.member.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      return null;
    }

    const newUser = await prisma.member.create({
        data: data,
    });

    return newUser.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  try {
    const user = await prisma.member.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  try {
    await prisma.memberPrefer.create({
      data: {
        memberId: userId,
        foodCategoryId: foodCategoryId,
      },
    });
    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (data) => {
  try {
    const preferences = await prisma.memberPrefer.findMany({
          select: {
            id: true,
            memberId: true,
            foodCategoryId: true,
            foodCategory: true,
          },
          where:{memberId : memberId},
      orderBy: { foodCategoryId: 'asc' },
    });

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

//
export const setReviewinStore = async (data) => {
    try{
      const storeExist = await prisma.store.findUnique({
        where: { id: data.storeid },
      });
  
      if (!storeExist) {
        return null;
      }
  
      const result = await prisma.review.create({
        data: {
          memberId: data.userid,
          storeId: data.storeid,
          body: data.body,
          score: data.score,
          createdAt: new Date(),
        },
      });
  
      return result.id;
    } catch(err){
        throw new Error(`오류가 발생하였습니다.`);
    }
};

export const setMissioninStore = async (data) => {
    try{
        // storeId가 존재하는지 확인하는 쿼리
        const storeExist = await prisma.store.findUnique({
          where: { id: data.storeid },
        });
    
        if (!storeExist) {
          return null;
        }
    
        const result = await prisma.mission.create({
          data: {
            storeId: data.storeid,
            reward: data.reward,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후
            missionSpec: data.missionspec,
          },
        });
    
        return result.id;

    } catch(err){
        throw new Error(`오류가 발생하였습니다.`)
    }
}

export const setMissioninUser = async (data) => {
    try{
      const result = await prisma.memberMission.create({
        data: {
          memberId: data.userid,
          missionId: data.missionid,
          status: data.status,
          createdAt: new Date(),
        },
      });
  
      return result.id;
    } catch(err){
        throw new Error(`오류가 발생하였습니다.`)
    }
}

//가게 리뷰
export const getAllStoreReviews = async (storeId,cursor) => {
  try{
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        body: true,
        member: true,
        store: true,
        memberId: true,
        storeId: true,
        score: true,
      },
      where: { storeId: storeId
        , id: { gt: cursor } 
    },
      orderBy: { id: "asc" },
      take: 5,
    });

    return reviews;
  } catch(err){
    console.error(err)
    throw new Error("레포지토리 에러");
  }
};

//유저 리뷰 받아오기
export const getAllUserReviews = async (memberId,cursor) => {
  try{
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        body: true,
        member: true,
        store: true,
        memberId: true,
        storeId: true,
        score: true,
      },
      where: { memberId: memberId
        , id: { gt: cursor } 
    },
      orderBy: { id: "asc" },
      take: 5,
    });

    return reviews;
  } catch(err){
    console.error(err)
    throw new Error("레포지토리 에러");
  }
};

//가게 미션 get api
export const getAllStoreMissions = async (storeId,cursor) => {
  try{
    const missions = await prisma.mission.findMany({
      select: {
        id: true,
        store: true,
        storeId: true,
        reward: true,
        deadline: true,
        missionSpec: true,
      },
      where: { storeId: storeId
        , id: { gt: cursor } 
    },
      orderBy: { id: "asc" },
      take: 5,
    });

    return missions;
  } catch(err){
    console.error(err)
    throw new Error("레포지토리 에러");
  }
};

//유저 미션 get api
export const getAllUserMissions = async (memberId, status,cursor) => {
  try{
    const missions = await prisma.memberMission.findMany({
      select: {
        id: true,
        mission: true,
        missionId: true,
        status: true,
      },
      where: { memberId: memberId,
        status: status
        , id: { gt: cursor } 
    },
      orderBy: { id: "asc" },
      take: 5,
    });

    return missions;
  } catch(err){
    console.error(err)
    throw new Error("레포지토리 에러");
  }
};

// 회원정보 수정하는 repository
export const setUpdateUser = async (data) => {
  console.log("body13:", data)
  try {
    // 1. name과 email로 회원 존재 여부 확인
    const existingMember = await prisma.member.findFirst({
      where: {
        name: data.name,
        email: data.email,
      },
    });

    if (!existingMember) {
      throw new Error("해당 이름과 이메일로 등록된 사용자가 없습니다.");
    }

    // 2. 회원 정보 업데이트
    const updatedMember = await prisma.member.update({
      where: { id: existingMember.id },
      data: {
        gender: data.gender,
        age: data.age,
        address: data.address,
        specAddress: data.specaddress,
        phoneNum: data.phonenum,
        updatedAt: new Date(), // Prisma가 자동으로 처리 가능
      },
    });

    // 3. 업데이트된 회원 정보 반환
    return updatedMember;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
  }
}