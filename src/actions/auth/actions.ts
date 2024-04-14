import { signIn } from "next-auth/react";

import { LoginInputType } from "./types";
import { LoginSchema } from "./schema";

export async function login(prm: LoginInputType) {
  const validatedFields = LoginSchema.safeParse(prm);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      error: res?.error,
      ok: res?.ok,
      url: res?.url,
      status: res?.status,
    };
  } catch (error) {
    return {
      error: "Hubo un error",
      ok: false,
      url: null,
      status: 404,
    };
  }
}
