import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

type Props = {
  name: string;
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
  const { name, email, password }: Props = await request.json();

  if (!name) {
    return NextResponse.json(
      { message: "Name should not be blank." },
      { status: 400 }
    );
  }

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

  if (findUser) {
    return NextResponse.json(
      { message: "Email already exists." },
      { status: 400 }
    );
  }

  const hashedPassword = await argon2.hash(password);
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  if (!createUser) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "User Successfully Registered.",
    },
    { status: 201 }
  );
}
