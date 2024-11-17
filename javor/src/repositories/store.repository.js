import { prisma } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
    const region = await prisma.region.findFirst({ where: { id: data.regionId } });
    if (!region) {
        return null;
    }
    const created = await prisma.store.create({ data: data });
    return created.id;
}

// 가게 불러오기
export const getStore = async (storeId) => {
    const store = await prisma.store.findFirstOrThrow({ where: { id: storeId } });
    return store;
}

// 가게에 미션추가
export const addStoreMission = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.storeId } });
    if (!store) {
        return null;
    }

    const created = await prisma.mission.create({ data: data });
    return created.id;
};

// 가게 미션 불러오기
export const getStoreMission = async (missionId) => {
    const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
    return mission;
}

// 가게에 리뷰추가
export const addStoreReview = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.storeId } });
    if (!store) {
        return null;
    }
    const created = await prisma.review.create({ data: data });
    return created.id;
}

// 가게 리뷰 불러오기
export const getStoreReview = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({ where: { id: reviewId } });
    return review;
}

export const getStoreReviewList = async (storeId, cursor) => {
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
        where: { storeId: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });
    if (!reviews[0]) {
        return null;
    }

    return reviews;
}

export const getStoreMissionList = async (storeId, cursor) => {
    const missions = await prisma.mission.findMany({
        select: {
            id: true,
            storeId: true,
            reward: true,
            deadline: true,
            missionSpec: true,
            store: true
        },
        where: { storeId: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });
    if (!missions[0]) {
        return null;
    }

    return missions;
};


