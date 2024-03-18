import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { formApi } from "../api";
import { API_ENDPOINTS } from "../constants";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Usename", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (
          !credentials ||
          credentials?.email.length === 0 ||
          credentials?.password.length === 0
        ) {
          return null;
        }

        const { email, password } = credentials;

        const { status, data } = await formApi.post(API_ENDPOINTS.USER.LOGIN, {
          email,
          password,
        });

        if (status === 200 && data.data.jwt) {
          return data.data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies AuthOptions;
