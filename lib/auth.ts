import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cache } from "react";

export interface SessionData {
  userId: string;
  userType: string;
  isLoggedIn: boolean;
  merchantIsAccepted: boolean;
}

const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: "auth-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
  },
};

export async function createAuthSession(userId: string, userType: "user" | "merchant" | "admin") {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  session.userId = userId;
  session.userType = userType;
  session.isLoggedIn = true;
  await session.save();
}

export const getSession = cache(async (): Promise<IronSession<SessionData>> => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  let user;

  if (session.userType == "user") {
    user = await prisma.user.findUnique({ where: { id: session.userId } });
  } else if (session.userType == "merchant") {
    user = await prisma.merchant.findUnique({ where: { id: session.userId } });
    if (!user?.isAccepted) {
      session.merchantIsAccepted = false;
    } else {
      session.merchantIsAccepted = true;
    }
  }

  if (!user) {
    return { isLoggedIn: false } as IronSession<SessionData>;
  }

  return session;
})

export const getUserById = async (id: string) => {
  if (!id) {
    return;
  }

  let user = await prisma.user.findUnique({
    where: { id: id },
    select: { id: true, name: true, email: true },
  });

  return user;
};

export const getMerchantById = async (id: string) => {
  if (!id) {
    return null;
  }

  let user = await prisma.merchant.findUnique({
    where: { id: id },
    select: { id: true, store_name: true, email: true, store_image: true },
  });
  
  return user;
};
