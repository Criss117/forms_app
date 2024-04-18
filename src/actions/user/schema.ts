import { z } from "zod";

import { FORM_MESSAGE } from "@/lib/constants";
import { JwtSchema } from "../schemas";

export const CreateUserSchema = z.object({
  name: z
    .string({
      required_error: FORM_MESSAGE.NAME.REQUIRED,
      invalid_type_error: FORM_MESSAGE.NAME.INVALID_TYPE,
    })
    .min(4, { message: FORM_MESSAGE.NAME.MIN_LENGHT })
    .max(32, { message: FORM_MESSAGE.NAME.MAX_LENGHT }),

  surname: z
    .string({
      required_error: FORM_MESSAGE.SURNAME.REQUIRED,
      invalid_type_error: FORM_MESSAGE.SURNAME.INVALID_TYPE,
    })
    .min(4, { message: FORM_MESSAGE.SURNAME.MIN_LENGHT })
    .max(32, { message: FORM_MESSAGE.SURNAME.MAX_LENGHT }),

  phone: z
    .string({
      required_error: FORM_MESSAGE.PHONE.REQUIRED,
      invalid_type_error: FORM_MESSAGE.PHONE.INVALID_TYPE,
    })
    .min(3, { message: FORM_MESSAGE.PHONE.MIN_LENGHT })
    .max(20, { message: FORM_MESSAGE.PHONE.MAX_LENGHT }),

  email: z
    .string({
      required_error: FORM_MESSAGE.EMAIL.REQUIRED,
      invalid_type_error: FORM_MESSAGE.EMAIL.INVALID_TYPE,
    })
    .email({
      message: FORM_MESSAGE.EMAIL.INVALID_TYPE,
    })
    .max(320, {
      message: FORM_MESSAGE.EMAIL.MAX_LENGHT,
    })
    .min(10, { message: FORM_MESSAGE.EMAIL.MIN_LENGHT }),

  password: z
    .string({
      required_error: FORM_MESSAGE.PASSWORD.REQUIRED,
      invalid_type_error: FORM_MESSAGE.PASSWORD.INVALID_TYPE,
    })
    .min(6, { message: FORM_MESSAGE.PASSWORD.MIN_LENGHT })
    .max(50, { message: FORM_MESSAGE.PASSWORD.MAX_LENGHT }),
  password_confirm: z
    .string({
      required_error: FORM_MESSAGE.PASSWORD.REQUIRED,
      invalid_type_error: FORM_MESSAGE.PASSWORD.INVALID_TYPE,
    })
    .min(6, { message: FORM_MESSAGE.PASSWORD.MIN_LENGHT })
    .max(50, { message: FORM_MESSAGE.PASSWORD.MAX_LENGHT }),
});

export const TokenSchema = z.object({
  token: z
    .string({
      required_error: FORM_MESSAGE.TOKEN.REQUIRED,
      invalid_type_error: FORM_MESSAGE.TOKEN.INVALID_TYPE,
    })
    .min(19, { message: FORM_MESSAGE.TOKEN.MIN_LENGHT })
    .max(19, {
      message: FORM_MESSAGE.TOKEN.MIN_LENGHT,
    }),
});

export const EmailSchema = z.object({
  email: CreateUserSchema.shape.email,
});

export const ChangePassSchema = z.object({
  token: TokenSchema.shape.token,
  password: CreateUserSchema.shape.password,
  password_confirm: CreateUserSchema.shape.password,
});

export const FindUsersSchema = z.object({
  query: z
    .string({
      required_error: FORM_MESSAGE.QUERY.REQUIRED,
      invalid_type_error: FORM_MESSAGE.QUERY.INVALID_TYPE,
    })
    .min(3, { message: FORM_MESSAGE.QUERY.MIN_LENGHT })
    .max(50, { message: FORM_MESSAGE.QUERY.MAX_LENGHT }),
  jwtoken: JwtSchema.shape.jwtoken,
});

export const FindUsersClientSchema = z.object({
  query: FindUsersSchema.shape.query,
});
