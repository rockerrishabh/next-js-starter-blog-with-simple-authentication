"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Links() {
  const pathname = usePathname();
  return (
    <>
      <li
        className={`hover:text-slate-900 hover:scale-105 ${
          pathname === "/" && "text-cyan-600"
        }`}>
        <Link href="/">Home</Link>
      </li>
      <li
        className={`hover:text-slate-900 hover:scale-105 ${
          pathname === "/featured-posts" && "text-cyan-600"
        }`}>
        <Link href="/">Featured Posts</Link>
      </li>
      <li
        className={`hover:text-slate-900 hover:scale-105 ${
          pathname === "/about-us" && "text-cyan-600"
        }`}>
        <Link href="/">About Us</Link>
      </li>
      <li
        className={`hover:text-slate-900 hover:scale-105 ${
          pathname === "/contact-us" && "text-cyan-600"
        }`}>
        <Link href="/">Contact Us</Link>
      </li>
    </>
  );
}

export default Links;
