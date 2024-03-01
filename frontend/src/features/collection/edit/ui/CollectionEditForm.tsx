import { Box, Button, Divider, TextField } from "@mui/material";
import { FC, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks/redux";
import { ICollection } from "../../../../shared/api/ICollection";
import { useEditCollection } from "../api/editCollection";
import { CollectionInputs } from "../types";
import { showFailtureToast } from "../../../../app/store/appSlice";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS_ROUTE } from "../../../../shared/config/consts";

type CollectionEditFormProps = {
  collection: ICollection;
  onClose: () => void;
};

export const CollectionEditForm: FC<CollectionEditFormProps> = ({
  collection,
  onClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<CollectionInputs>({
    defaultValues: {
      title: collection?.title,
      description: collection?.description || "",
    },
  });

  const { editCollection } = useEditCollection();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleClose = () => {
    setBtnLoading(false);
    onClose();
  };

  const onError = () => {
    setBtnLoading(false);
  };

  const onSuccess = (slug: string) => {
    handleClose();

    navigate("/" + collection.user.name + COLLECTIONS_ROUTE + "/" + slug);
  };

  const onSubmit: SubmitHandler<CollectionInputs> = (data) => {
    if (collection && currentUser) {
      setBtnLoading(true);

      editCollection({
        data,
        id: collection.id,
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
        label="Имя"
        fullWidth
        required
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
          {btnLoading ? "Загрузка..." : "Сохранить"}
        </Button>
      </Box>
    </form>
  );
};
