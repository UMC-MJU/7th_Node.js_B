import { pool } from "../db.config.js";

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
