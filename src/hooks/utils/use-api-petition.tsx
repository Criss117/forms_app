"use client";
import { useEffect, useState, useTransition } from "react";
import useCurrentSession from "./use-current-session";

const useApiPetition = () => {
  const [jwt, setJwt] = useState("");
  const [ready, setReady] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data, loading } = useCurrentSession();

  useEffect(() => {
    if (loading || !data) return;
    setJwt(data.user.jwt);
    setReady(true);
  }, [data, loading]);

  const handlePetition = (state: "init" | "finished") => {
    state === "init" ? setIsPending(true) : setIsPending(false);
  };

  return { isPending, jwt, ready, handlePetition };
};

export default useApiPetition;
