import { z } from "zod";

import { FORM_MESSAGE } from "@/lib/constants";
import { JwtSchema } from "../schemas";

export const CreateFolderSchema = z.object({
  name: z
    .string({
      required_error: FORM_MESSAGE.NAME.REQUIRED,
      invalid_type_error: FORM_MESSAGE.NAME.INVALID_TYPE,
    })
    .min(4, { message: FORM_MESSAGE.NAME.MIN_LENGHT })
    .max(30, { message: FORM_MESSAGE.NAME.MAX_LENGHT }),
  jwtoken: JwtSchema.shape.jwtoken,
});

export const FindFolderSchema = z.object({
  folderId: z.string({
    required_error: FORM_MESSAGE.ID.REQUIRED,
    invalid_type_error: FORM_MESSAGE.ID.INVALID_TYPE,
  }),
  jwtoken: JwtSchema.shape.jwtoken,
});

export const CreateFolderSchemaClient = z.object({
  name: CreateFolderSchema.shape.name,
});
