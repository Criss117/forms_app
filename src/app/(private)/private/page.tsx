"use client";

import { useSession } from "next-auth/react";

const Page = () => {
  const { data, status, update } = useSession();

  return <div>{JSON.stringify({ data, status, update }, null, 2)}</div>;
};

export default Page;
