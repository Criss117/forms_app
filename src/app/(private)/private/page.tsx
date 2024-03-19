"use client";

import { signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data, status, update } = useSession();

  return (
    <div>
      {JSON.stringify({ data, status, update }, null, 2)}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Page;
