import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { signIn } from "next-auth/react";
import Login from "./auth/Login";
import Logged from "./auth/Logged";
import Link from "next/link";

export default async function Nav() {
  const session = await unstable_getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-100 shadow-md">
      <Link href="/">
        <h1 className="font-bold text-xl text-gray-900">SendIt.</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {/* Add additional navigation items here */}
      </ul>
      {!session?.user ? (
        <Login />
      ) : (
        <Logged image={session.user.image || ""} />
      )}
    </nav>
  );
}
