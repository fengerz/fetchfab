import { FieldValues, UseFormSetError } from "react-hook-form";
import { showFailtureToast } from "../../../../app/store/appSlice";
import {
  useGetCsrfQuery,
  useLazyAuthQuery,
  useLoginMutation,
} from "../../../../entities/user";
import { useAppDispatch } from "../../../../shared/hooks/redux";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";
import { LoginInputs } from "../types";

type LoginUserProps = {
  data: LoginInputs;
  onError: () => void;
  onSuccess: () => void;
  setError: UseFormSetError<FieldValues>;
};

export const useLoginUser = () => {
  const dispatch = useAppDispatch();

  const { error: csrfError } = useGetCsrfQuery(null);
  const [auth] = useLazyAuthQuery();
  const [login] = useLoginMutation();
  const { handleErrors } = useValidationErrors();

  const loginUser = async ({
    data,
    onSuccess,
    onError,
    setError,
  }: LoginUserProps) => {
    if (csrfError) {
      dispatch(showFailtureToast("Ошибка соединения с сервером!"));
    }

    try {
      await login(data).unwrap();

      auth("");

      onSuccess();
    } catch (error) {
      onError();

      const errorMessage = "Пользователь с таким email и паролем не найден";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { loginUser };
};
