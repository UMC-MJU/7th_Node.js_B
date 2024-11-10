import { prisma } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
    const created = await prisma.store.create({ data: data });
    return created.id;
}

// 가게에 미션추가
export const addStoreMission = async (data) => {
    const created = await prisma.mission.create({ data: data });
    return created.id;
};

// 가게에 리뷰추가
export const addStoreReview = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.id } });
    if (!store) {
        return null;
    }
    const created = await prisma.review.create({ data: data });
    return created.id;
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
    console.log(reviews, storeId);
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
    return missions;
};


