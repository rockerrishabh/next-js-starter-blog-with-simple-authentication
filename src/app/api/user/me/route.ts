import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorised Access. No token is provided.",
      },
      { status: 400 }
    );
  }
  const verifyToken = (await jwt.verify(token.value, "secret")) as {
    email: string;
    iat: number;
    exp: number;
  };

  if (!verifyToken) {
    return NextResponse.json(
      { message: "Unauthorised Access. Invalid Token Provided" },
      { status: 400 }
    );
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email: verifyToken.email,
    },
  });

  if (!findUser) {
    return NextResponse.json(
      { message: "No user found with this provided token." },
      { status: 400 }
    );
  }
  const { password: pwd, ...user } = findUser;
  const accessToken = await jwt.sign(user, "secret", {
    expiresIn: "1d",
  });
  return NextResponse.json(
    {
      accessToken,
    },
    { status: 200 }
  );
}
