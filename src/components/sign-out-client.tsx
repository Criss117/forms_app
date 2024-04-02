"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

const SignOutClient = () => {
  useEffect(() => {
    console.log("client");
    signOut();
  }, []);
  return null;
};

export default SignOutClient;
