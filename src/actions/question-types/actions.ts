"use server";

import { AxiosResponse } from "axios";

import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";
import { createSafeAction, formApi, handlerError } from "@/lib";

import {
  FindQuestionInputType,
  FindQuestionReturnTypes,
  QuestionType,
} from "./types";
import { JwtSchema } from "../schemas/index";

export async function FindQuestionTypesHandle(
  jwt: FindQuestionInputType
): Promise<FindQuestionReturnTypes> {
  const { jwtoken } = jwt;

  try {
    const { data, status }: AxiosResponse<CommonAPIResponse<QuestionType[]>> =
      await formApi.get(API_ENDPOINTS.TYPES.FIND, {
        headers: {
          Authorization: `Bearer ${jwtoken}`,
        },
      });

    if (status !== 200) {
      return {
        response: {
          statusCode: status,
          message: data.message,
        },
      };
    }

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

export const FindQuestionTypes = createSafeAction(
  JwtSchema,
  FindQuestionTypesHandle
);
