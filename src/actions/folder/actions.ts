"use server";

import { AxiosResponse } from "axios";

import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";
import { createSafeAction, formApi, handlerError, sleep } from "@/lib";

import {
  AddFolderMemberInputType,
  AddFolderMemberReturnType,
  CreateFolderInputType,
  CreateFolderReturnType,
  Folders,
  FindFolderInputType,
  FindFolderReturnType,
  FindFoldersInputType,
  FindFoldersReturnType,
} from "./types";
import {
  addFolderMembersSchema,
  CreateFolderSchema,
  FindFolderSchema,
} from "./schema";
import { JwtSchema } from "../schemas";

async function findFoldersHandler({
  jwtoken,
}: FindFoldersInputType): Promise<FindFoldersReturnType> {
  try {
    const { data, status }: AxiosResponse<CommonAPIResponse<Folders>> =
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

export async function addFolderMembersHandler(
  members: AddFolderMemberInputType
): Promise<AddFolderMemberReturnType> {
  const { userId, folderId, permission, jwtoken } = members;
  try {
    const { data, status } = await formApi.post(
      API_ENDPOINTS.FOLDER.ADD_MEMBERS,
      {
        userId,
        folderId,
        permission: Number(permission),
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

export const findFoldersAction = createSafeAction(
  JwtSchema,
  findFoldersHandler
);

export const createFolder = createSafeAction(
  CreateFolderSchema,
  createFolderHandler
);

export const findFolder = createSafeAction(FindFolderSchema, findFolderHandler);

export const addFolderMembers = createSafeAction(
  addFolderMembersSchema,
  addFolderMembersHandler
);
