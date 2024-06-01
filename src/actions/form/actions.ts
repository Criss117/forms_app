"use server";

import { AxiosResponse } from "axios";

import { createSafeAction, formApi, handlerError } from "@/lib";
import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";

import {
  CreateFormInputType,
  CreateFormReturnType,
  FindFormInputType,
  FindFormReturnType,
} from "./types";
import { CreateFormSchema, FindFormSchema } from "./schema";

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
    return handlerError(error);
  }
}

async function findFormHandler(
  data: FindFormInputType
): Promise<FindFormReturnType> {
  const { formId, jwtoken, folderId } = data;

  try {
    const { status, data } = await formApi.get(
      `${API_ENDPOINTS.FOLDER.FIND}/${folderId}/${API_ENDPOINTS.FORM.FIND}/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtoken}`,
        },
      }
    );

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

export const createForm = createSafeAction(CreateFormSchema, createFormHandler);
export const findFormById = createSafeAction(FindFormSchema, findFormHandler);
