"use client";

import Link from "next/link";
import Links from "./Links";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

function Nav() {
  const { auth } = useContext(AuthContext);
  return (
    <nav className="hidden md:flex items-center space-x-10">
      <ul className="flex space-x-5 text-[15px] text-slate-700">
        <Links />
      </ul>
      {auth ? (
        <Link
          href="/dashboard"
          className="text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 hover:scale-105 py-2 px-4 rounded-md">
          Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 hover:scale-105 py-2 px-4 rounded-md">
          Login
        </Link>
      )}
    </nav>
  );
}

export default Nav;
