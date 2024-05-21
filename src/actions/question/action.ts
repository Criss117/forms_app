"use server";

import { AxiosResponse } from "axios";

import { createSafeAction, formApi, handlerError } from "@/lib";
import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";

import { CreateQuestionInputType } from "./types";
import { CreateQuestionSchema } from "./schema";

export async function createQuestionHandler(
  newQuestion: CreateQuestionInputType
) {
  const { jwtoken, ...question } = newQuestion;

  try {
    const { data, status }: any = await formApi.post(
      API_ENDPOINTS.QUESTION.CREATE,
      {
        ...question,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtoken}`,
        },
      }
    );

    return {
      response: {
        statusCode: status,
        message: data.message,
        data: data.data,
      },
    };
  } catch (error: AxiosResponse<CommonAPIResponse> | any) {
    return handlerError(error);
  }
}

export const createQuestion = createSafeAction(
  CreateQuestionSchema,
  createQuestionHandler
);
