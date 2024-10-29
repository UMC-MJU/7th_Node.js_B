import { pool } from "../db.config.js";

// 가게 추가
// 가게 데이터 삽입
export const addStore = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO store (region_id, name, address, score) VALUES (?, ?, ?, ?);`,
            [
                data.region_id,
                data.name,
                data.address,
                data.score,
            ]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 정보 얻기
export const getStore = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

        console.log(store);

        if (store.length == 0) {
            return null;
        }

        return store;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 지역 반환
export const getRegionByRegionId = async (regionId) => {
    const conn = await pool.getConnection();

    try {
        const [region] = await pool.query(`SELECT * FROM region WHERE id = ?;`, regionId);

        console.log(region);

        return region;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 리뷰 추가
// 리뷰 데이터 삽입
export const addStoreReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query( // confirm이라는 변수에 db 값을 받음
            `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
            data.store_id
        );

        if (!confirm[0].isExistStore) { // 스토어가 존재하지 않으면 null
            return null;
        }

        const [result] = await pool.query( // result라는 변수에 db 값을 받음
            `INSERT INTO review (member_id, store_id, body, score) VALUES (?, ?, ?, ?);`,
            [
                data.member_id,
                data.store_id,
                data.body,
                data.score,
            ]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 리뷰 정보 얻기
export const getStoreReview = async (reviewId) => {
    const conn = await pool.getConnection();

    try {
        const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);

        console.log(review);

        if (review.length == 0) {
            return null;
        }

        return review;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 리뷰 이미지 매핑
export const setStoreReviewImage = async (review_id, store_id, image_url) => {
    const conn = await pool.getConnection();

    try {
        await pool.query(
            `INSERT INTO review_image (review_id, store_id, image_url) VALUES (?, ?, ?);`,
            [review_id, store_id, image_url]
        );

        return;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 리뷰 이미지 반환
export const getStoreReviewImageByReviewId = async (reviewId) => {
    const conn = await pool.getConnection();

    try {
        const [reviewImage] = await pool.query(
            "SELECT ri.id, ri.review_id, ri.store_id, ri.image_url, r.body " +
            "FROM review_image ri JOIN review r on ri.review_id = r.id " +
            "WHERE ri.review_id = ? ORDER BY ri.review_id ASC;",
            reviewId
        );

        return reviewImage;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 미션 추가
// 가게 미션 데이터 삽입
export const addStoreMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query( // result라는 변수에 db 값을 받음
            `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);`,
            [
                data.store_id,
                data.reward,
                data.deadline,
                data.mission_spec,
            ]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 미션 정보 얻기
export const getStoreMission = async (missionId) => {
    const conn = await pool.getConnection();

    try {
        const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

        console.log(mission);

        if (mission.length == 0) {
            return null;
        }

        return mission;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 미션 도전 중인 미션에 추가
// 가게 미션 도전 데이터 삽입
export const addStoreMissionChallenge = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query( // confirm이라는 변수에 db 값을 받음
            `SELECT EXISTS(SELECT 1 FROM member_mission WHERE mission_id = ?) as isExistMissionChallenge;`,
            data.mission_id
        );

        if (confirm[0].isExistMissionChallenge) { // 멤버 미션에서 이미 미션이 있다면 null
            return null;
        }

        const [result] = await pool.query( // result라는 변수에 db 값을 받음
            `INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, ?);`,
            [
                data.member_id,
                data.mission_id,
                data.status,
            ]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 가게 미션 도전 정보 얻기
export const getStoreMissionChallenge = async (missionChallengeId) => {
    const conn = await pool.getConnection();

    try {
        const [missionChallenge] = await pool.query(`SELECT * FROM member_mission WHERE id = ?;`, missionChallengeId);

        console.log(missionChallenge);

        if (missionChallenge.length == 0) {
            return null;
        }

        return missionChallenge;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};