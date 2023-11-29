"use client";

import { useContext, useRef } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import Links from "./Links";

function MobileMenu() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const { auth } = useContext(AuthContext);
  const handleMenu = () => {
    if (menuRef.current?.open) {
      menuRef.current?.close();
    } else {
      menuRef.current?.show();
    }
  };

  return (
    <section className="flex space-x-4 md:hidden">
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
      <button
        className="hover:scale-105"
        type="button"
        title="Open Menu"
        onClick={handleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 outline-none cursor-pointer hover:text-cyan-500 active:rotate-12">
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <dialog
        ref={menuRef}
        className={`md:hidden transition-transform top-0 duration-150 ease-in-out outline-none border-l w-52 hover:border-cyan-500 p-2 left-0 right-0 fixed h-full bg-white transform ${
          menuRef.current?.open ? "translate-x-0" : "translate-x-full"
        }`}>
        <button
          className="hover:scale-105"
          type="button"
          title="Close Menu"
          onClick={handleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 outline-none cursor-pointer hover:text-cyan-500 active:rotate-12">
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul className="flex items-center flex-col space-y-2">
          <Links />
        </ul>
      </dialog>
    </section>
  );
}

export default MobileMenu;
