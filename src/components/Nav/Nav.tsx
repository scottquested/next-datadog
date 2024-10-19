import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center h-16 px-8 sm:px-20">
      <h1 className="text-2xl font-bold">My App</h1>
      <div className="flex justify-end gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
};

export default Nav;
