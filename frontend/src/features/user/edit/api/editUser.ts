import { FieldValues, UseFormSetError } from "react-hook-form";
import { useUpdateUserMutation } from "../../../../entities/user";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";

type EditUserProps = {
  id: number;
  data: FormData;
  onError: () => void;
  onSuccess: (username: string) => void;
  setError: UseFormSetError<FieldValues>;
};

export const useEditUser = () => {
  const [updateUser] = useUpdateUserMutation();
  const { handleErrors } = useValidationErrors();

  const editUser = async ({
    id,
    data,
    onSuccess,
    onError,
    setError,
  }: EditUserProps) => {
    try {
      const response = await updateUser({ id, data }).unwrap();

      onSuccess(response.data.name);
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при редактировании профиля";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { editUser };
};
