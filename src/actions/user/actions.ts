"use server";
import { AxiosResponse } from "axios";

import { API_ENDPOINTS } from "@/lib/constants";
import { createSafeAction, formApi } from "@/lib";
import { CommonAPIResponse } from "@/lib/models";
import {
  ConfirmAccountReturnType,
  TokenSchema,
  CreateUserInputType,
  CreateUserReturnType,
  CreateUserSchema,
  TokenInputType,
  EmailInputType,
  EmailSchema,
  VerifyEmailReturnType,
  ChangePassInputType,
  ChangePassReturnType,
  ChangePassSchema,
} from ".";

async function createUserHandler(
  user: CreateUserInputType
): Promise<CreateUserReturnType> {
  const { email, name, password, phone, surname } = user;
  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.post(API_ENDPOINTS.USER.CREATE, {
        email,
        name,
        password,
        phone,
        surname,
      });

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

async function confirmAccountHandler(
  prm: TokenInputType
): Promise<ConfirmAccountReturnType> {
  const { token } = prm;

  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.patch(API_ENDPOINTS.USER.CONFIRM_ACCOUNT, {
        token,
      });

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

async function verifyEmailHandler(
  prm: EmailInputType
): Promise<VerifyEmailReturnType> {
  const { email } = prm;

  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.patch(API_ENDPOINTS.USER.VERIFY_EMAIL, {
        email,
      });

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

async function changePassHandler(
  prm: ChangePassInputType
): Promise<ChangePassReturnType> {
  const { password, token } = prm;

  try {
    const { data, status }: AxiosResponse<CommonAPIResponse> =
      await formApi.patch(API_ENDPOINTS.USER.CHANGE_PASSWORD, {
        password,
        token,
      });

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

export const createUser = createSafeAction(CreateUserSchema, createUserHandler);
export const confirmAccount = createSafeAction(
  TokenSchema,
  confirmAccountHandler
);
export const verifyEmail = createSafeAction(EmailSchema, verifyEmailHandler);
export const changePass = createSafeAction(ChangePassSchema, changePassHandler);
