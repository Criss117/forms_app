import { z } from "zod";

import { ActionState } from "@/lib";
import { JwtSchema } from "../schemas";
export interface QuestionType {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  active: number;
  subTypes: Subtype[];
}

export interface Subtype {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  active: number;
}

export type FindQuestionInputType = z.infer<typeof JwtSchema>;
export type FindQuestionReturnTypes = ActionState<
  FindQuestionInputType,
  Array<QuestionType>
>;
