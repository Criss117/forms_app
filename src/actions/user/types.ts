import { z } from "zod";
import {
  TokenSchema,
  CreateUserSchema,
  EmailSchema,
  ChangePassSchema,
} from "./schema";
import { ActionState } from "@/lib";

export type CreateUserInputType = z.infer<typeof CreateUserSchema>;
export type CreateUserReturnType = ActionState<CreateUserInputType, any>;

export type TokenInputType = z.infer<typeof TokenSchema>;
export type ConfirmAccountReturnType = ActionState<TokenInputType, any>;

export type EmailInputType = z.infer<typeof EmailSchema>;
export type VerifyEmailReturnType = ActionState<EmailInputType, any>;

export type ChangePassInputType = z.infer<typeof ChangePassSchema>;
export type ChangePassReturnType = ActionState<ChangePassInputType, any>;
