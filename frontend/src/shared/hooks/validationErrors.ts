import { useAppDispatch } from "./redux";
import { showFailtureToast } from "../../app/store/appSlice";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

type ValidationErrorsProps = {
  error: FetchBaseQueryError | unknown;
  errorMessage: string;
  setError: UseFormSetError<FieldValues>;
};

type fetchErrorProps = {
  message: string;
  errors: Record<string, string[]>;
};

export function useValidationErrors<T extends FieldValues>() {
  const dispatch = useAppDispatch();

  const handleErrors = ({
    error,
    errorMessage,
    setError,
  }: ValidationErrorsProps) => {
    if (error && (error as FetchBaseQueryError).status === 422) {
      const fetchError = error as FetchBaseQueryError;

      if (fetchError.data && typeof fetchError.data === "object") {
        const errorData = fetchError.data as fetchErrorProps;

        errorMessage = errorData.message || "";

        Object.entries(errorData.errors).forEach(([fieldName, message]) => {
          setError(fieldName as Path<T>, {
            type: "manual",
            message: message[0] as string,
          });
        });
      }
    }

    dispatch(showFailtureToast(errorMessage));
  };

  return { handleErrors };
}
