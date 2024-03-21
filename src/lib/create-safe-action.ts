import { z } from "zod";
import { CommonAPIResponse } from "./models";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<T, P> = {
  fieldErros?: FieldErrors<T>;
  error?: string | null;
  response?: CommonAPIResponse<P> | null;
};

export const createSafeAction = <T, P>(
  schema: z.Schema<T>,
  handler: (validateData: T) => Promise<ActionState<T, P>>
) => {
  return async (data: T): Promise<ActionState<T, P>> => {
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return {
        fieldErros: validatedData.error.flatten().fieldErrors as FieldErrors<T>,
      };
    }

    return await handler(validatedData.data);
  };
};
