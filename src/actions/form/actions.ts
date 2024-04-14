"use server";

import { AxiosResponse } from "axios";

import { createSafeAction, formApi } from "@/lib";
import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";

import { CreateFormInputType, CreateFormReturnType } from "./types";
import { CreateFormSchema } from "./schema";

async function createFormHandler(
  form: CreateFormInputType
): Promise<CreateFormReturnType> {
  const { description, folderId, jwtoken, name } = form;

  const newForm = {
    description,
    folderId,
    name,
  };

  try {
    const { data, status } = await formApi.post(
      API_ENDPOINTS.FORM.CREATE,
      newForm,
      { headers: { Authorization: `Bearer ${jwtoken}` } }
    );

    if (status !== 201) {
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
    const {
      response: { data },
    } = error;

    return {
      response: {
        statusCode: error.response.status,
        message: data.message,
        errorCode: data.errorCode,
        error: data.error,
      },
    };
  }
}

export const createForm = createSafeAction(CreateFormSchema, createFormHandler);
