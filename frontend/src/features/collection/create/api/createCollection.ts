import { CollectionIputs } from "../types";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useStoreCollectionMutation } from "../../../../entities/collection";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";

type CreateCollectionProps = {
  username: string;
  data: CollectionIputs;
  onError: () => void;
  onSuccess: () => void;
  setError: UseFormSetError<FieldValues>;
};

export const useCreateCollection = () => {
  const [storeCollection] = useStoreCollectionMutation();
  const { handleErrors } = useValidationErrors();

  const createCollection = async ({
    data,
    username,
    onSuccess,
    setError,
    onError,
  }: CreateCollectionProps) => {
    try {
      await storeCollection({ username, data }).unwrap();

      onSuccess();
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при создании коллекции";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { createCollection };
};
