import { FC, useState } from "react";
import { CommentInputs } from "../types";
import { Button, TextField } from "@mui/material";
import { useCreateComment } from "../api/createComment";
import { IProduct } from "../../../../shared/api/IProduct";
import {
  FieldValues,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";

type CreateCommentProps = {
  product: IProduct;
  isLoading: boolean;
};

export const CreateCommentForm: FC<CreateCommentProps> = ({
  product,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CommentInputs>();

  const { createComment } = useCreateComment();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const onError = () => {
    setBtnLoading(false);
  };

  const onSuccess = () => {
    setBtnLoading(false);
    reset();
  };

  const onSubmit: SubmitHandler<CommentInputs> = async (data) => {
    setBtnLoading(true);

    await createComment({
      data,
      productId: product?.id,
      onError,
      onSuccess,
      setError: setError as UseFormSetError<FieldValues>,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        multiline
        placeholder="Оставить комментарий"
        disabled={isLoading}
        fullWidth
        rows={2}
        sx={{ mb: 1 }}
        error={Boolean(errors?.text)}
        helperText={errors?.text?.message}
        {...register("text", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 3,
            message: "Имя не должно быть короче 3 символов",
          },
          maxLength: {
            value: 255,
            message: "Имя не должно быть длиннее 255 символов",
          },
        })}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading || btnLoading}
      >
        {btnLoading ? "Загрузка..." : "Отправить"}
      </Button>
    </form>
  );
};
