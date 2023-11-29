import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

type Props = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const cookieStore = cookies();
  if (cookieStore.get("token")) {
    return NextResponse.json(
      {
        message: "User is already logged in.",
      },
      { status: 400 }
    );
  }
  const { email, password }: Props = await request.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email should not be blank." },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { message: "Password should not be blank." },
      { status: 400 }
    );
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    return NextResponse.json(
      { message: "Email does not exist." },
      { status: 400 }
    );
  }

  if (!findUser.password) {
    return NextResponse.json(
      {
        message:
          "Password does not exist. You created your Account with different provider",
      },
      { status: 400 }
    );
  }

  const verifiedPassword = await argon2.verify(findUser.password, password);

  if (!verifiedPassword) {
    return NextResponse.json(
      { message: "Password does not match with our records" },
      { status: 400 }
    );
  }
  const { password: pwd, ...user } = findUser;
  const refreshToken = await jwt.sign({ email: user.email }, "secret", {
    expiresIn: "7d",
  });
  const accessToken = await jwt.sign(user, "secret", {
    expiresIn: "1d",
  });
  const today = new Date();
  const sevendays = today.setTime(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set("token", refreshToken, {
    httpOnly: true,
    expires: sevendays,
  });
  return NextResponse.json(
    {
      accessToken,
    },
    { status: 200 }
  );
}
