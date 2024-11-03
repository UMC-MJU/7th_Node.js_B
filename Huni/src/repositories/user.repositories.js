import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO member (email, name, gender, address, spec_address, phone_num) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        // data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
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
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
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
export const getUserPreferencesByUserId = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT ufc.id, ufc.category_id, ufc.member_id, fcl.name " +
        "FROM member_prefer ufc JOIN food_category fcl on ufc.category_id = fcl.id " +
        "WHERE ufc.member_id = ? ORDER BY ufc.category_id ASC;",
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

//
export const setReviewinStore = async (data) => {
    const conn = await pool.getConnection();
    console.log(data.storeid);
    try{

        // storeId가 존재하는지 확인하는 쿼리
        const [storeExist] = await conn.query(
            "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExist",
            [data.storeid]
        );
        console.log(storeExist);

        // storeId가 존재하지 않으면 null 반환
        if (!storeExist[0].isExist) {
            return null;
        }
        // 데이터 삽입
        const[result] = await pool.query(
            "INSERT INTO review (member_id, store_id, body, score, created_at) VALUES ( ?, ?, ?, ?, NOW());",
            [
                data.userid,
                data.storeid,
                data.body,
                data.score,
            ]
        );
        return result.insertId;
    } catch(err){
        throw new Error(`오류가 발생하였습니다.`);
    } finally{
        conn.release();
    }
};

export const setMissioninStore = async (data) => {
    const conn = await pool.getConnection();
    try{
        // storeId가 존재하는지 확인하는 쿼리
        const [storeExist] = await conn.query(
            "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExist",
            [data.storeid]
        );

        // storeId가 존재하지 않으면 null 반환
        if (!storeExist[0].isExist) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), ?);`,
            [
                data.storeid,
                data.reward,
                data.missionspec,
            ]
        );
        return result.insertId;

    } catch(err){
        throw new Error(`오류가 발생하였습니다.`)
    } finally{
        conn.release();
    }

}

export const setMissioninUser = async (data) => {
    const conn = await pool.getConnection();

    try{
        const [result] = await pool.query(
            `INSERT INTO member_mission (member_id, mission_id, status, created_at) VALUES (?, ?, ?, NOW());`,
            [
                data.userid,
                data.missionid,
                data.status,
            ]
        );
        return result.insertId;
    } catch(err){
        throw new Error(`오류가 발생하였습니다.`)
    } finally{
        conn.release();
    }
}