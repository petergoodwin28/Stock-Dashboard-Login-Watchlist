import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import { useSession } from "next-auth/react";

function DashBody() {
  const { data: session } = useSession();
  const user = session ? `, ${session.user?.name}.` : "";

  return (
    <div className="flex flex-col justify-center prose ml-auto mr-auto text-center mb-32 mt-32 p-20 border">
      <h1 className="font-extralight text-xl">
        Welcome to your Stock Dashboard {user}
      </h1>

      <p>
        The information for the stocks is gathered using <code>Polygon.io</code>
      </p>

      <p className="lead">
        {" "}
        Please click the button below if you would like to view the chart for a
        specific stock!
      </p>

      <Button asChild variant={"outline"} className="w-fit ml-auto mr-auto">
        <Link href={"/stockdashboard"} className="">
          Stock Chart
        </Link>
      </Button>
    </div>
  );
}

export default DashBody;
