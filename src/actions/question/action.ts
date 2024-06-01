"use server";

import { AxiosResponse } from "axios";

import { createSafeAction, formApi, handlerError } from "@/lib";
import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";

import { CreateQuestionInputType, CreateQuestionReturnType } from "./types";
import { CreateQuestionSchema } from "./schema";

export async function createQuestionHandler(
  newQuestion: CreateQuestionInputType
): Promise<CreateQuestionReturnType> {
  const { jwtoken, editing, ...newQuestionInfo } = newQuestion;

  const {
    question: { questionId, ...restQuestion },
  } = newQuestionInfo;

  try {
    if (editing && questionId > 0) {
      const { data, status }: any = await formApi.patch(
        `${API_ENDPOINTS.QUESTION.CREATE}/${newQuestionInfo.question.questionId}`,
        {
          question: restQuestion,
          answers: newQuestionInfo.answers,
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
    }

    const { data, status }: any = await formApi.post(
      API_ENDPOINTS.QUESTION.CREATE,
      {
        ...newQuestionInfo,
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
