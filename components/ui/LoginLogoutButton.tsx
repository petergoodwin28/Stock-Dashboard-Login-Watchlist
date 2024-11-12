


import React from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./button";
import Link from "next/link";

function LoginLogoutButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <Button
          asChild
          onClick={() => signOut()}
          variant={"outline"}
          className="w-fit ml-auto mr-auto"
        >
          <Link href={"/"} className="">
            Sign Out
          </Link>
        </Button>
      ) : (
        <Button
          asChild
        //   onClick={() => signOut()}
          variant={"outline"}
          className="w-fit ml-auto mr-auto"
        >
          <Link href={"/"} className="">
            Sign in
          </Link>
        </Button>
      )}
    </div>
  );
}

export default LoginLogoutButton;
