import { z } from "zod";

import { FORM_MESSAGE } from "@/lib/constants";
import { JwtSchema } from "@/actions/schemas";

export const QuestionSchema = z.object({
  formId: z
    .string({
      required_error: FORM_MESSAGE.ID.REQUIRED,
      invalid_type_error: FORM_MESSAGE.ID.INVALID_TYPE,
    })
    .uuid({ message: FORM_MESSAGE.ID.INVALID_TYPE }),
  required: z.boolean({
    required_error: FORM_MESSAGE.REQUIRED.REQUIRED,
    invalid_type_error: FORM_MESSAGE.REQUIRED.INVALID_TYPE,
  }),
  question: z
    .string({
      required_error: FORM_MESSAGE.QUESTION.REQUIRED,
      invalid_type_error: FORM_MESSAGE.QUESTION.INVALID_TYPE,
    })
    .min(4, { message: FORM_MESSAGE.QUESTION.MIN_LENGHT })
    .max(255, { message: FORM_MESSAGE.QUESTION.MAX_LENGHT }),
  subtypeId: z
    .number({
      required_error: FORM_MESSAGE.SUBTYPE.REQUIRED,
    })
    .positive(),
});

export const CreateAnswerSchema = z.object({
  id: z.number(),
  answer: z.string().max(255, { message: FORM_MESSAGE.ANSWER.MAX_LENGTH }),
});

export const CreateQuestionSchema = z.object({
  jwtoken: JwtSchema.shape.jwtoken,
  question: QuestionSchema,
  answers: z.array(CreateAnswerSchema),
});

export const CreateQuestionSchemaClient = z.object({
  formId: QuestionSchema.shape.formId,
  required: QuestionSchema.shape.required,
  question: QuestionSchema.shape.question,
  subtypeId: QuestionSchema.shape.subtypeId,
  answers: CreateQuestionSchema.shape.answers,
});
