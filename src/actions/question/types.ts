import { z } from "zod";

import { CreateQuestionSchema } from "./schema";
import { ActionState } from "@/lib";
import { Question } from "../form";

export type CreateQuestionInputType = z.infer<typeof CreateQuestionSchema>;
export type CreateQuestionReturnType = ActionState<
  CreateQuestionInputType,
  Question
>;
