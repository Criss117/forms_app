import { z } from "zod";

import { CreateFormSchema, FindFormSchema } from "@/actions/form/schema";
import { ActionState } from "@/lib";
import { Subtype } from "../question-types/types";
import { USER_PERMISSIONS } from "@/lib/constants";

export type FormHeader = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  active: number;
  folderd: string;
  owner: boolean;
  permission: USER_PERMISSIONS;
};

export interface Question {
  id: number;
  required: boolean;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  active: number;
  answers: Answer[];
  subtype: Subtype;
}

export interface Answer {
  id: number;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  active: number;
}

export type FormComplete = FormHeader & {
  questions: Array<Question>;
};

export type CreateFormInputType = z.infer<typeof CreateFormSchema>;
export type CreateFormReturnType = ActionState<
  CreateFormInputType,
  {
    formId: string;
  }
>;

export type FindFormInputType = z.infer<typeof FindFormSchema>;
export type FindFormReturnType = ActionState<FindFormInputType, FormComplete>;
