import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// Member 데이터 삽입
export const addMember = async (data) => {

  try {
    const member = await prisma.user.findFirst({ where: { email: data.email } });
    if (member) {
      return null;
    }
    const created = await prisma.user.create({ data: data });
  return created.id;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
// 사용자 정보 얻기
export const getMember = async (memberId) => {
  try {
    const member = await prisma.user.findFirstOrThrow({ where: { id: memberId } });
  return member;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (memberId, foodCategoryId) => {
  try {
    await prisma.userFavorCategory.create({
      data: {
        memberId: memberId,
        foodCategoryId: foodCategoryId,
      },
    });
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (memberId) => {
  try {
    const preferences = await prisma.MemberPrefer.findMany({
      select: {
        id: true,
        memberId: true,
        foodCategoryId: true,
        foodCategory: true,
      },
      where: { memberId: memberId },
      orderBy: { foodCategoryId: "asc" },
    });
  
    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

//가게 데이터 삽입
export const addStore = async (data) => {
  const conn = await pool.getConnection();
  console.log("body13:", data)
  try {
      const [result] = await pool.query(
          `INSERT INTO store (region_id, name, address, score, created_at, updated_at) VALUES (?, ?, ?, ?, ? ,?);`,
          [
            data.regionId,
            data.name,
            data.address,
            data.score,
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

// 멤버 미션 추가하기
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