import { FieldValues, UseFormSetError } from "react-hook-form";
import { useStoreCommentMutation } from "../../../../entities/comment";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";
import { CommentInputs } from "../types";

type CreateCommentProps = {
  data: CommentInputs;
  productId: number;
  onError: () => void;
  onSuccess: () => void;
  setError: UseFormSetError<FieldValues>;
};

export const useCreateComment = () => {
  const [storeComment] = useStoreCommentMutation();
  const { handleErrors } = useValidationErrors();

  const createComment = async ({
    data,
    productId,
    onError,
    onSuccess,
    setError,
  }: CreateCommentProps) => {
    try {
      await storeComment({ productId, data }).unwrap();

      onSuccess();
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при создании комментария";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { createComment };
};
