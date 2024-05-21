"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useCurrentSession = () => {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (status === "authenticated") {
      setLoading(false);
      return;
    }

    if (status === "unauthenticated" && data === null) {
      signOut();
      setLoading(false);
      return;
    }

    return () => setLoading(false);
  }, [status]);

  return {
    data,
    loading,
  };
};

export default useCurrentSession;
