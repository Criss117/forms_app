import { AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { CommonAPIResponse } from "./models";
import { PRIVATE_ROUTES, STATUS_CODE } from "@/lib/constants";

interface Response {
  error: string;
  success: boolean;
  statusCode: number;
  errorCode?: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function verifyResponse(
  response: CommonAPIResponse<any> | null | undefined
) {
  if (!response) {
    return {
      error: "Hubo un error",
      success: false,
      statusCode: 404,
      errorCode: -1,
    };
  }

  const { CLIENT_ERRROS, DB_ERRORS, SUCCESSFULL } = STATUS_CODE;
  let res: Response | null = null;

  for (const error of DB_ERRORS) {
    if (response.errorCode === error.CODE) {
      res = {
        error: response.message || error.MESSAGE,
        success: false,
        statusCode: response.statusCode,
        errorCode: response.errorCode,
      };
      break;
    }
  }

  if (res) return res;

  for (const error of CLIENT_ERRROS) {
    if (response.statusCode === error.CODE) {
      res = {
        error: response.message || error.MESSAGE,
        success: false,
        statusCode: response.statusCode,
      };
      break;
    }
  }

  if (res) return res;

  for (const error of SUCCESSFULL) {
    if (response.statusCode === error.CODE) {
      res = {
        error: "",
        success: true,
        statusCode: response.statusCode,
      };
      break;
    }
  }

  return res;
}

export async function sleep(ms: number = 3000) {
  const promise = new Promise((resolve) => setTimeout(resolve, ms));
  await promise;
  return;
}

export function isPrivateRoute(path: string) {
  let isPrivateRoute = false;

  Object.values(PRIVATE_ROUTES).forEach((route) => {
    if (path.includes(route)) isPrivateRoute = true;
  });

  return isPrivateRoute;
}

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString("es-ES", options);
}

export function handlerError(error: AxiosResponse<CommonAPIResponse> | any) {
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

export function firstLetterUppercase(...args: Array<string>) {
  return args.map((item) => {
    if (typeof item === "string" && item.length > 0) {
      return item.charAt(0).toUpperCase();
    } else {
      return ""; // O podrías lanzar un error o manejarlo de alguna otra manera según tus necesidades
    }
  });
}
