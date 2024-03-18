import { z } from "zod";
import { CreateUserSchema } from "../user";

export const LoginSchema = z.object({
  email: CreateUserSchema.shape.email,
  password: CreateUserSchema.shape.password,
});
