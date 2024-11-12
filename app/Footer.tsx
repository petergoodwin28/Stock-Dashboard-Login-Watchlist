"use client";
import React from "react";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

import LoginLogoutButton from "@/components/ui/LoginLogoutButton";

function Footer() {
  return (
    <div className="  w-full">
          <div className="flex flex-row justify-around items-center h-24 border">
      {/* <Link href={'/'} className={buttonVariants({ variant: "link" })}>Home</Link> */}
      <Button asChild variant={"outline"} className="w-fit ml-auto mr-auto">
        <Link href={"/"} className="">
          Home
        </Link>
      </Button>

      {/* <Link href={'/'} className={buttonVariants({ variant: "ghost" })}>Github</Link> */}
      <Button asChild variant={"outline"} className="w-fit ml-auto mr-auto">
        <Link href={"/"} className="">
          GitHub
        </Link>
      </Button>

      {/* <Link href={'/'} onClick={() => signOut()} className={buttonVariants({ variant: "ghost" })}>Logout</Link> */}
      <div className="w-fit ml-auto mr-auto">
        <LoginLogoutButton></LoginLogoutButton>
      </div>
    </div>

    </div>

  );
}

export default Footer;
