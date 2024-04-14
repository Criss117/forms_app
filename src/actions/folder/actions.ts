"use server";

import { AxiosResponse } from "axios";

import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";
import { createSafeAction, formApi, handlerError, sleep } from "@/lib";

import {
  CreateFolderInputType,
  CreateFolderReturnType,
  FindFolderInputType,
  FindFolderReturnType,
  FindFoldersInputType,
  FindFoldersReturnType,
} from "./types";
import { JwtSchema } from "../schemas";
import { CreateFolderSchema, FindFolderSchema } from "./schema";

async function findFoldersHandler({
  jwtoken,
}: FindFoldersInputType): Promise<FindFoldersReturnType> {
  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.get(API_ENDPOINTS.FOLDER.FIND, {
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
    return handlerError(error);
  }
}

export async function findFolderHandler(
  folderInfo: FindFolderInputType
): Promise<FindFolderReturnType> {
  const { folderId, jwtoken } = folderInfo;
  try {
    const { data, status } = await formApi.get(
      `${API_ENDPOINTS.FOLDER.FIND}/${folderId}`,
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

export const findFolders = createSafeAction(JwtSchema, findFoldersHandler);
export const createFolder = createSafeAction(
  CreateFolderSchema,
  createFolderHandler
);
export const findFolder = createSafeAction(FindFolderSchema, findFolderHandler);
