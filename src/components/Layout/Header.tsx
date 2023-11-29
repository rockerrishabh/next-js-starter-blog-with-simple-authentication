import Link from "next/link";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";

function Header() {
  return (
    <header className="border-b hover:border-cyan-500">
      <section className="py-3 px-5 max-w-[75rem] mx-auto flex sticky top-0 justify-between items-center bg-white">
        <Link
          href="/"
          className="text-3xl font-extrabold gradient-logo text-transparent bg-clip-text">
          BLOG
        </Link>
        <Nav />
        <MobileMenu />
      </section>
    </header>
  );
}

export default Header;
