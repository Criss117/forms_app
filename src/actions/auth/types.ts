import { ActionState } from "@/lib";
import { z } from "zod";
import { LoginSchema } from "./schema";

export interface ILoginReturn {
  email: string;
  name: string;
  surname: string;
  jwt: string;
}

export type LoginInputType = z.infer<typeof LoginSchema>;
export type LoginReturnType = ActionState<LoginInputType, ILoginReturn>;
