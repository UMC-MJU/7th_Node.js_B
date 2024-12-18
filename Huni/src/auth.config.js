import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy} from "passport-naver-v2"
import { prisma } from "./db.config.js";

dotenv.config();

//구글 로그인
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

//google 로그인 시 프로필 정보 가져오기
const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.member.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.member.create({
      data: {
        email,
        name: profile.displayName,
        gender: "추후 수정",
        // birth: new Date(1970, 0, 1),
        address: "추후 수정",
        specaddress: "추후 수정",
        phoneNum: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };

  //naver 로그인
  export const nvaerStrategy = new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: "http://localhost:3000/oauth2/callback/naver",
      scope: ["email", "profile"],
      state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      return naverVerify(profile)
        .then((user) => cb(null, user))
        .catch((err) => cb(err));
    }
  );

  const naverVerify = async (profile) => {
    const email = profile.email;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.member.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.member.create({
      data: {
        email,
        name: profile.name,
        gender: "추후 수정",
        // birth: new Date(1970, 0, 1),
        address: "추후 수정",
        specaddress: "추후 수정",
        phoneNum: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };