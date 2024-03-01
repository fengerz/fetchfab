import { FieldValues, UseFormSetError } from "react-hook-form";
import { showFailtureToast } from "../../../../app/store/appSlice";
import {
  useGetCsrfQuery,
  useRegisterMutation,
} from "../../../../entities/user";
import { useAppDispatch } from "../../../../shared/hooks/redux";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";
import { RegisterInputs } from "../types";

type RegisterUserProps = {
  data: RegisterInputs;
  onError: () => void;
  onSuccess: () => void;
  setError: UseFormSetError<FieldValues>;
};

export const useRegisterUser = () => {
  const dispatch = useAppDispatch();

  const { error: csrfError } = useGetCsrfQuery(null);
  const [registration] = useRegisterMutation();
  const { handleErrors } = useValidationErrors();

  const registerUser = async ({
    data,
    onError,
    onSuccess,
    setError,
  }: RegisterUserProps) => {
    if (csrfError) {
      dispatch(showFailtureToast("Ошибка соединения с сервером!"));
    }

    try {
      await registration(data).unwrap();

      onSuccess();
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при регистрации";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { registerUser };
};
