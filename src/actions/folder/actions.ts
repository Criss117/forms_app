"use server";

import { getServerSession } from "next-auth";
import { AxiosResponse } from "axios";

import { API_ENDPOINTS } from "@/lib/constants";
import { CommonAPIResponse } from "@/lib/models";
import { createSafeAction, formApi } from "@/lib";
import authConfig from "@/lib/auth/auth.config";

import { FindFoldersInputType, FindFoldersReturnType } from "./types";
import { JwtSchema } from "../schemas";

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

export const findFolders = createSafeAction(JwtSchema, findFoldershandler);

export async function findAllFolders() {
  const session = await getServerSession(authConfig);
  const jwt = session?.user.jwt;

  if (!jwt) {
    return {
      response: {
        statusCode: 401,
        message: "Unauthorized",
      },
    };
  }

  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.get(API_ENDPOINTS.FOLDER.FIND_ALL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
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
