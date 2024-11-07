import { pool } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO store(region_id, name, address, score)VALUES (?, ?, ?, ?);`,
            [
                data.region_id,
                data.name,
                data.address,
                data.score
            ]
        );
        return result.insertId;

    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요.(${err})`
        );
    } finally {
        conn.release();
    }
}

// 가게에 미션추가
export const addStoreMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO mission(store_id, reward, deadline, mission_spec)VALUES (?, ?, ?, ?)`,
            [
                data.store_id,
                data.reward,
                data.deadline,
                data.mission_spec
            ]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요.(${err})`
        );
    } finally {
        conn.release();
    }
}

// 가게에 리뷰추가
export const addStoreReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO review(member_id, store_id, body, score)VALUES(?, ?, ?, ?)`,
            [
                data.member_id,
                data.store_id,
                data.body,
                data.score
            ]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요.(${err})`
        );
    } finally {
        conn.release();
    }
}
