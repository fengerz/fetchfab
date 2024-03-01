import { Box, Button, Divider, TextField } from "@mui/material";
import { FC, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { useCreateCollection } from "../api/createCollection";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks/redux";
import { CollectionIputs } from "../types";
import { showFailtureToast } from "../../../../app/store/appSlice";

type CollectionCreateProps = {
  onClose: () => void;
};

export const CollectionCreateForm: FC<CollectionCreateProps> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<CollectionIputs>();

  const { createCollection } = useCreateCollection();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleClose = () => {
    setBtnLoading(false);
    onClose();
  };

  const onError = () => {
    setBtnLoading(false);
  };

  const onSuccess = () => {
    handleClose();
  };

  const onSubmit: SubmitHandler<CollectionIputs> = (data) => {
    if (currentUser) {
      setBtnLoading(true);

      createCollection({
        data,
        username: currentUser.name,
        setError: setError as UseFormSetError<FieldValues>,
        onSuccess,
        onError,
      });
    } else {
      dispatch(showFailtureToast("Ошибка авторизации пользователя"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Имя коллекции"
        required
        fullWidth
        sx={{ mb: 2 }}
        error={Boolean(errors?.title)}
        helperText={errors?.title?.message}
        {...register("title", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 3,
            message: "Имя не должно быть короче 3 символов",
          },
          maxLength: {
            value: 64,
            message: "Имя не должно быть длиннее 64 символов",
          },
        })}
      />

      <TextField
        label="Описание"
        multiline
        rows={4}
        fullWidth
        error={Boolean(errors?.description)}
        helperText={errors?.description?.message}
        {...register("description", {
          maxLength: {
            value: 255,
            message: "Описание не должно быть длиннее 255 символов",
          },
        })}
      />

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "end" }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
          Отменить
        </Button>

        <Button variant="contained" type="submit" disabled={btnLoading}>
          {btnLoading ? "Загрузка..." : "Создать"}
        </Button>
      </Box>
    </form>
  );
};
