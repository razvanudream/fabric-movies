import { AxiosError } from "axios";
import { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_TYPE } from "./constants.js";

export const formatError = (error) => {
  if (error instanceof AxiosError) {
    return [
      {
        type: error?.response?.statusText,
        message: error?.response?.data?.Error,
      },
    ];
  }

  return [
    {
      type: UNKNOWN_ERROR_TYPE,
      message: error?.message ?? UNKNOWN_ERROR_MESSAGE,
    },
  ];
};
