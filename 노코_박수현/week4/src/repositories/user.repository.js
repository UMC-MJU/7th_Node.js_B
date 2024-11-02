import { pool } from "../db.config.js";

// 유저 회원가입
// User 데이터 삽입
export const addUser = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query( // confirm이라는 변수에 db 값을 받음
            `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
            data.email
        );

        if (confirm[0].isExistEmail) { // 이메일 존재하면 null
            return null;
        }

        const [result] = await pool.query( // result라는 변수에 db 값을 받음
            `INSERT INTO member (name, gender, age, address, spec_address, phone_num, status, email, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                data.name,
                data.gender,
                data.age,
                data.address,
                data.spec_address,
                data.phone_num,
                data.status,
                data.email,
                data.point,
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

// 사용자 정보 얻기
export const getUser = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [user] = await pool.query(`SELECT * FROM member WHERE id = ?;`, userId);

        console.log(user);

        if (user.length == 0) {
            return null;
        }

        return user;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (member_id, category_id) => {
    const conn = await pool.getConnection();

    try {
        await pool.query(
            `INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);`,
            [category_id, member_id]
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

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [preferences] = await pool.query(
            "SELECT mp.id, mp.category_id, mp.member_id, fc.name " +
            "FROM member_prefer mp JOIN food_category fc on mp.category_id = fc.id " +
            "WHERE mp.member_id = ? ORDER BY mp.category_id ASC;",
            userId
        );

        return preferences;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 유저 약관 동의
// 약관 동의 매핑
export const setUserAgree = async (member_id, terms_id) => {
    const conn = await pool.getConnection();

    try {
        await pool.query(
            `INSERT INTO member_agree (member_id, terms_id) VALUES (?, ?);`,
            [member_id, terms_id]
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

// 약관 동의 반환
export const getUserAgreeByUserId = async (member_id) => {
    const conn = await pool.getConnection();

    try {
        const [userAgree] = await pool.query(
            `SELECT * FROM member_agree WHERE member_id = ?;`,
            member_id
        );

        return userAgree;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};