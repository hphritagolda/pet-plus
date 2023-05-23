import utils from "@/utils.server";
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import User from "./Users";
import dbConnect from "@/mongoose.server";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "__session",
      secrets: [process.env.TOKEN_SECRET!],

      sameSite: "lax",
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      secure: true,
    },
  });

export const validateUser = async (
  request: Request,
  email: string,
  password: string
) => {
  await dbConnect();
  const session = await getSession(request.headers.get("Cookie"));

  const user = await User.findOne({ email: email });

  if (!user) {
    session.flash("error", "User not found");
    return { session, isValid: false };
  }

  const isValid = utils.verifyPassword(password, user.password);

  if (!isValid) {
    session.flash("error", "Email/Password incorrect");
    return { session, isValid: false };
  }

  const userId = user.id as string;
  session.set("userId", userId);

  return { session, isValid: true };
};

export async function getUserId(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return session.get("userId");
}

export async function getCurrentUser(request: Request) {
  const userId = await getUserId(request);

  await dbConnect();

  const user = await User.findById(
    userId,
    "firstName lastName email accessLevel"
  );

  return user;
}

export async function logoutSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return destroySession(session);
}
