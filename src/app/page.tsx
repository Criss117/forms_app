"use client";
import { login } from "@/actions/auth";
import {
  CreateUserInputType,
  changePass,
  confirmAccount,
  createUser,
  verifyEmail,
} from "@/actions/user";
import { useSession } from "next-auth/react";

const user: CreateUserInputType = {
  name: "Cristian",
  surname: "Fernandez",
  email: "t4U3u@example.com",
  password: "12345678",
  password_confirm: "12345678",
  phone: "HolaMundo3443",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      {/* <button
        onClick={async () => {
          const res = await createUser(user);
          console.log({ res });
        }}
      >
        CreateUser
      </button>
      <button
        onClick={async () => {
          const res = await confirmAccount({ token: "02f2gho3bd1hp4pvi9l" });
          console.log({ res });
        }}
      >
        ConfirmAccount
      </button>

      <button
        onClick={async () => {
          const res = await verifyEmail({ email: "t4u3u3@example.com" });
          console.log({ res });
        }}
      >
        verify email
      </button>

      <button
        onClick={async () => {
          const res = await changePass({
            password: "HolaMundo3443",
            token: "gldblhevq881hp4scm3",
          });
          console.log({ res });
        }}
      >
        change password
      </button> */}

      <button
        onClick={async () => {
          const res = await login({
            password: "123456",
            email: "cristianviveros227@gmail.com",
          });
          console.log({ res });
        }}
      >
        login
      </button>
    </div>
  );
}
