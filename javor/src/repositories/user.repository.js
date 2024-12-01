import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const member = await prisma.member.findFirst({ where: { email: data.email } });

  if (member) {
    return null;
  }

  const created = await prisma.member.create({ data: data });
  return created.id;
};

//이메일로 사용자 찾기
export const getUserByEmail = async (email) => {
  return await prisma.member.findFirst({ where: { email } });
};

// 사용자 정보 업데이트(이메일이 이미 존재하는 경우)
export const updateUser = async (email, data) => {
  const updated = await prisma.member.update({
    where: { email },
    data: {
      name: data.name ?? undefined,
      gender: data.gender ?? undefined,
      age: data.age ?? undefined,
      address: data.address ?? undefined,
      specAddress: data.specAddress ?? undefined,
      phoneNum: data.phoneNum ?? undefined,
      status: data.status ?? undefined,
    },
  });
  return updated;
};

// 사용자 정보 얻기
export const getUser = async (memberId) => {
  const member = await prisma.member.findFirstOrThrow({ where: { id: memberId } });
  return member;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (memberId, categoryId) => {
  await prisma.memberPrefer.create({
    data: {
      memberId: memberId,
      categoryId: categoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (memberId) => {
  const preferences = await prisma.memberPrefer.findMany({
    select: {
      id: true,
      memberId: true,
      categoryId: true,
      category: true,
    },
    where: { memberId: memberId },
    orderBy: { categoryId: "asc" },
  });
  return preferences;
};

export const addUserMission = async (data) => {
  // 해당 missionId가 존재하는지 확인
  const missionExists = await prisma.mission.findUnique({
    where: {
      id: data.missionId, // mission 테이블에서 missionId를 찾기
    }
  });

  // missionId가 존재하지 않으면 null 반환
  if (!missionExists) {
    return null;  // 없는 미션 ID인 경우 처리
  }

  // 이미 도전 중인 미션이 있는지 확인
  const missionChallenge = await prisma.memberMission.findFirst({
    where: {
      missionId: data.missionId,
      memberId: data.memberId
    }
  });

  if (missionChallenge) {
    return { duplicate: true };  // 이미 도전 중인 미션
  }

  // 미션 추가
  const created = await prisma.memberMission.create({ data: data });
  return created ? created.id : null;
};

export const getUserMission = async (userMissionId) => {
  // 사용자가 도전한 미션 정보 조회
  const userMission = await prisma.memberMission.findUnique({
    where: {
      id: userMissionId
    },
    include: {
      mission: true, // mission 테이블의 미션 정보도 포함해서 조회할 수 있음
    }
  });

  return userMission;
};


// 내가 작성한 리뷰 목록 얻기
export const getUserReviewList = async (memberId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      memberId: true,
      storeId: true,
      body: true,
      score: true,
      member: true,
      store: true
    },
    where: { memberId: memberId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  if (!reviews[0]) {
    return null;
  }

  return reviews;
}

// 내가 진행중인 미션 목록 얻기
export const getUserOngoingMissionList = async (memberId, status, cursor) => {
  const ongoingMissions = await prisma.memberMission.findMany({
    select: {
      id: true,
      memberId: true,
      missionId: true,
      status: true,
      member: true,
      mission: true
    },
    where: { memberId: memberId, status: status, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  if (!ongoingMissions[0]) {
    return null;
  }
  return ongoingMissions;
};

export const getMissionId = async (memberId, missionId, status) => {
  const memberMission = await prisma.memberMission.findFirst({
    where: {
      memberId: memberId,
      missionId: missionId,
    }
  });

  if (!memberMission) {
    return null;
  }

  return memberMission.id;
}
// 진행완료로 변경
export const patchUserMissionComplete = async (status, id) => {
  const missionComplete = await prisma.memberMission.update({
    where: {
      id: id
    },
    data: {
      status: status
    }
  });
  return missionComplete;
}

