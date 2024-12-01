import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { prisma } from "./db.config.js";

dotenv.config();

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


const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const member = await prisma.member.findFirst({ where: { email } });
    if (member !== null) {
        return { id: member.id, email: member.email, name: member.name };
    }

    const created = await prisma.member.create({
        data: {
            email,
            name: profile.displayName,
            gender: "추후 수정",
            age: 0,
            address: "추후 수정",
            specAddress: "추후 수정",
            phoneNum: "추후 수정",
            status: "추후 수정",
            point: 0
        },
    });

    return { id: created.id, email: created.email, name: created.name };

};


export const naverStrategy = new NaverStrategy(
    {
        clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
        clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/naver",
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

    const member = await prisma.member.findFirst({ where: { email } });
    if (member !== null) {
        return { id: member.id, email: member.email, name: member.name };
    }

    const created = await prisma.member.create({
        data: {
            email,
            name: profile.nickname,
            gender: profile.gender,
            age: 0,
            address: "추후 수정",
            specAddress: "추후 수정",
            phoneNum: "추후 수정",
            status: "추후 수정",
            point: 0
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};
