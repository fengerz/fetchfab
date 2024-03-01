import { FieldValues, UseFormSetError } from "react-hook-form";
import { useUpdateCollectionMutation } from "../../../../entities/collection";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";
import { CollectionInputs } from "../types";

type EditCollectionProps = {
  id: number;
  username: string;
  data: CollectionInputs;
  onError: () => void;
  onSuccess: (slug: string) => void;
  setError: UseFormSetError<FieldValues>;
};

export const useEditCollection = () => {
  const [updateCollection] = useUpdateCollectionMutation();
  const { handleErrors } = useValidationErrors();

  const editCollection = async ({
    id,
    data,
    username,
    onSuccess,
    setError,
    onError,
  }: EditCollectionProps) => {
    try {
      const response = await updateCollection({ username, data, id }).unwrap();

      onSuccess(response.data.slug);
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при редактировании коллекции";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { editCollection };
};
