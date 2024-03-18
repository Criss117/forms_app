import authConfig from "@/lib/auth/auth.config";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
