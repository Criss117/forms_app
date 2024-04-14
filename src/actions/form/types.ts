import { z } from "zod";

import { CreateFormSchema } from "@/actions/form/schema";
import { ActionState } from "@/lib";

export type FormHeader = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  active: number;
};

export type CreateFormInputType = z.infer<typeof CreateFormSchema>;
export type CreateFormReturnType = ActionState<
  CreateFormInputType,
  {
    formId: string;
  }
>;
