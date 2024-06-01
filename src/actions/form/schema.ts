import { z } from "zod";

import { FORM_MESSAGE } from "@/lib/constants";
import { JwtSchema } from "@/actions/schemas";

export const CreateFormSchema = z.object({
  folderId: z
    .string({
      required_error: FORM_MESSAGE.FOLDER.REQUIRED,
      invalid_type_error: FORM_MESSAGE.FOLDER.INVALID_TYPE,
    })
    .max(50, { message: FORM_MESSAGE.FOLDER.MAX_LENGHT }),
  name: z
    .string({
      required_error: FORM_MESSAGE.NAME.REQUIRED,
      invalid_type_error: FORM_MESSAGE.NAME.INVALID_TYPE,
    })
    .min(5, { message: FORM_MESSAGE.NAME.MIN_LENGHT })
    .max(30, { message: FORM_MESSAGE.NAME.MAX_LENGHT }),
  description: z
    .string({
      required_error: FORM_MESSAGE.DESCRIPTION.REQUIRED,
      invalid_type_error: FORM_MESSAGE.DESCRIPTION.INVALID_TYPE,
    })
    .min(4, { message: FORM_MESSAGE.DESCRIPTION.MIN_LENGHT })
    .max(255, { message: FORM_MESSAGE.DESCRIPTION.MAX_LENGHT }),
  jwtoken: JwtSchema.shape.jwtoken,
});

export const FindFormSchema = z.object({
  folderId: z
    .string({
      required_error: FORM_MESSAGE.FOLDER.REQUIRED,
      invalid_type_error: FORM_MESSAGE.FOLDER.INVALID_TYPE,
    })
    .max(50, { message: FORM_MESSAGE.FOLDER.MAX_LENGHT }),
  formId: z
    .string({
      required_error: FORM_MESSAGE.ID.REQUIRED,
      invalid_type_error: FORM_MESSAGE.ID.INVALID_TYPE,
    })
    .uuid({ message: FORM_MESSAGE.ID.INVALID_TYPE }),
  jwtoken: JwtSchema.shape.jwtoken,
});

export const CreateFormSchemaClient = z.object({
  folderId: CreateFormSchema.shape.folderId,
  name: CreateFormSchema.shape.name,
  description: CreateFormSchema.shape.description,
});
