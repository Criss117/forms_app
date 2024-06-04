import { z } from "zod";

import { CreateQuestionSchema, DeleteQuestionSchema } from "./schema";
import { ActionState } from "@/lib";
import { Question } from "../form";

export type CreateQuestionInputType = z.infer<typeof CreateQuestionSchema>;
export type CreateQuestionReturnType = ActionState<
  CreateQuestionInputType,
  Question
>;

export type DeleteQuestionInputType = z.infer<typeof DeleteQuestionSchema>;

export type DeleteQuestionReturnType = ActionState<
  DeleteQuestionInputType,
  any
>;
