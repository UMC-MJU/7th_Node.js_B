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
export const getUserPreferencesByUserId = async (userId) => {
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

// 리뷰 데이터 생성
export const addReview = async (data) => {
  const conn = await pool.getConnection();
  console.log("body13:", data)
  console.log(data.storeid);
  try{

      const [storeExist] = await conn.query(
          "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExist",
          [data.storeid]
      );
      console.log(storeExist);

      if (!storeExist[0].isExist) {
          return null;
      }

      const[result] = await pool.query(
          "INSERT INTO review (member_id, store_id, body, score, created_at) VALUES ( ?, ?, ?, ?, ?);",
          [
              data.userid,
              data.storeid,
              data.body,
              data.score,
              data.createdAt,
          ]
      );
      return result.insertId;
  } catch(err){
      throw new Error(`오류가 발생하였습니다.`);
  } finally{
      conn.release();
  }
};


//미션 데이터 삽입
export const addMission = async (data) => {
    const conn = await pool.getConnection();
    console.log("body13:", data)
    try {
        const [result] = await pool.query(
            `INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) VALUES (?, ?, ?, ?, ? ,?);`,
            [
                data.storeId,
                data.reward,
                data.deadline,
                data.missionspec,
                data.createdAt,
                data.updatedAt,
            ]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    };
}

export const addMemberMission = async (data) => {
  const conn = await pool.getConnection();
  console.log("body13:", data)
  try {
      const [result] = await pool.query(
          `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) VALUES (?, ?, ?, ? ,?);`,
          [
              data.memberId,
              data.missionId,
              data.status,
              data.createdAt,
              data.updatedAt,
          ]
      );
      return result.insertId;
  } catch (err) {
      throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
  } finally {
      conn.release();
  };
}