import { z } from "zod";

import { FORM_MESSAGE, USER_PERMISSIONS } from "@/lib/constants";
import { JwtSchema } from "@/actions/schemas";

export const CreateFolderSchemaClient = z.object({
  name: z
    .string({
      required_error: FORM_MESSAGE.NAME.REQUIRED,
      invalid_type_error: FORM_MESSAGE.NAME.INVALID_TYPE,
    })
    .min(4, { message: FORM_MESSAGE.NAME.MIN_LENGHT })
    .max(30, { message: FORM_MESSAGE.NAME.MAX_LENGHT }),
});

export const CreateFolderSchema = CreateFolderSchemaClient.extend({
  jwtoken: JwtSchema.shape.jwtoken,
});

export const FindFolderSchema = z.object({
  folderId: z.string({
    required_error: FORM_MESSAGE.ID.REQUIRED,
    invalid_type_error: FORM_MESSAGE.ID.INVALID_TYPE,
  }),
  jwtoken: JwtSchema.shape.jwtoken,
});

export const addFolderMembersClientSchema = z.object({
  userId: z.number({
    required_error: FORM_MESSAGE.ID.REQUIRED,
    invalid_type_error: FORM_MESSAGE.ID.INVALID_TYPE,
  }),
  folderId: FindFolderSchema.shape.folderId,
  permission: z.nativeEnum(USER_PERMISSIONS),
});

export const addFolderMembersSchema = addFolderMembersClientSchema.extend({
  jwtoken: JwtSchema.shape.jwtoken,
});

export const deleteFolderMembersClientSchema = z.object({
  memberId: z.number({
    required_error: FORM_MESSAGE.ID.REQUIRED,
    invalid_type_error: FORM_MESSAGE.ID.INVALID_TYPE,
  }),
  folderId: FindFolderSchema.shape.folderId,
});

export const deleteFolderMembersSchema = deleteFolderMembersClientSchema.extend(
  {
    jwtoken: JwtSchema.shape.jwtoken,
  }
);
