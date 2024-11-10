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

// 유저 미션 추가
export const addUserMission = async (data) => {
  const missionChallenge = await prisma.memberMission.findFirst({
    where: {
      missionId: data.missionId,
      memberId: data.memberId
    }
  });
  if (missionChallenge) {
    return null;
  }
  const created = await prisma.memberMission.create({ data: data });
  return created.id;
};

export const getUserMission = async (missionChallengeId) => {
  const missionChallenge = await prisma.memberMission.findFirstOrThrow({ where: { id: missionChallengeId } })
  return missionChallenge;
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
  return ongoingMissions;
};

export const getMissionId = async (memberId, missionId) => {
  const memberMission = await prisma.memberMission.findFirst({
    where: {
      memberId: memberId,
      missionId: missionId
    }
  });
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

