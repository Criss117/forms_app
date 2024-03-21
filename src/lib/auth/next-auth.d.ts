import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      surname: string;
      email: string;
      jwt: string;
    };
  }
}
