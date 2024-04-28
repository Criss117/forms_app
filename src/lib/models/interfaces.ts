export interface CommonAPIResponse<T = any> {
  statusCode: number;
  message?: string;
  error?: string;
  errorCode?: number;
  data?: T;
}

export interface PropsWithIsPending {
  isPending: boolean;
}
