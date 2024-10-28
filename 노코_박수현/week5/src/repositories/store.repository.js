import { pool } from "../db.config.js";

// 리뷰 데이터 삽입
export const addReview = async (data) => {
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

        return [result.insertId, data.member_id, data.store_id];
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 리뷰 정보 얻기
export const getReview = async (reviewId) => {
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
export const setReviewImage = async (review_id, store_id, image_url) => {
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
export const getReviewImageByReviewId = async (reviewId) => {
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
