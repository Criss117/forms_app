"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

const SignOutClient = () => {
  useEffect(() => {
    signOut();
  }, []);
  return null;
};

export default SignOutClient;
