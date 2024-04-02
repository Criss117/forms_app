"use server";

import { AxiosResponse } from "axios";

import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";
import { createSafeAction, formApi } from "@/lib";

import {
  CreateFolderInputType,
  CreateFolderReturnType,
  FindFoldersInputType,
  FindFoldersReturnType,
} from "./types";
import { JwtSchema } from "../schemas";
import { CreateFolderSchema } from "./schema";

async function findFoldershandler({
  jwtoken,
}: FindFoldersInputType): Promise<FindFoldersReturnType> {
  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.get(API_ENDPOINTS.FOLDER.FIND_ALL, {
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

async function createFolderHandler(
  folder: CreateFolderInputType
): Promise<CreateFolderReturnType> {
  try {
    const { data, status } = await formApi.post(
      API_ENDPOINTS.FOLDER.CREATE,
      {
        name: folder.name,
      },
      {
        headers: {
          Authorization: `Bearer ${folder.jwtoken}`,
        },
      }
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

export const findFolders = createSafeAction(JwtSchema, findFoldershandler);
export const createFolder = createSafeAction(
  CreateFolderSchema,
  createFolderHandler
);
