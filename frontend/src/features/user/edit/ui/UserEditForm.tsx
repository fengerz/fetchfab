import {
  Avatar,
  Box,
  Button,
  Divider,
  FormHelperText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { useAppSelector } from "../../../../shared/hooks/redux";
import { UserAvatar } from "../../../../entities/user";
import { CloudUpload } from "@mui/icons-material";
import { useEditUser } from "../api/editUser";
import { UserInputs } from "../types";
import { useNavigate } from "react-router-dom";

type UserEditFormProps = {
  onClose: () => void;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UserEditForm: FC<UserEditFormProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.user);

  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>({
    defaultValues: {
      name: currentUser?.name,
    },
  });

  const { editUser } = useEditUser();

  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleClose = () => {
    setBtnLoading(false);
    setFile(null);
    onClose();
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onError = () => {
    setFile(null);
    setBtnLoading(false);
  };

  const onSuccess = (username: string) => {
    handleClose();

    navigate("/" + username);
  };

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    setBtnLoading(true);

    const formData = new FormData();

    for (const key in data) {
      const value = data[key as keyof UserInputs];

      if (typeof value === "string" && value) {
        formData.append(key, value);
      }
    }

    file && formData.append("image", file);

    currentUser &&
      editUser({
        id: currentUser?.id,
        data: formData,
        setError: setError as UseFormSetError<FieldValues>,
        onSuccess,
        onError,
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" paragraph>
        Информация о профиле
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        {file ? (
          <Avatar
            src={URL.createObjectURL(file)}
            sx={{ height: 80, width: 80 }}
            variant="rounded"
          />
        ) : (
          <UserAvatar user={currentUser} heigth={80} width={80} />
        )}

        <Box sx={{ ml: 3 }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{ mb: 1 }}
          >
            Загрузить фото
            <VisuallyHiddenInput type="file" onChange={onFileChange} />
          </Button>

          <FormHelperText sx={{ ml: 1, mt: 1 }}>
            JPG или PNG до 2МБ
          </FormHelperText>
        </Box>
      </Box>

      <TextField
        label="Логин"
        fullWidth
        required
        sx={{ mb: 2 }}
        error={Boolean(errors?.name)}
        helperText={errors?.name?.message}
        {...register("name", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 2,
            message: "Имя не должно быть короче 2 символов",
          },
          maxLength: {
            value: 32,
            message: "Имя не должно быть длиннее 32 символов",
          },
        })}
      />

      <Typography variant="h6" paragraph>
        Смена пароля
      </Typography>

      <TextField
        label="Текущий пароль"
        fullWidth
        type="password"
        sx={{ mb: 2 }}
        error={Boolean(errors?.current_password)}
        helperText={errors?.current_password?.message}
        {...register("current_password", {
          required: {
            value: Boolean(watch("current_password")),
            message: "Поле обязательно для заполнения",
          },
          minLength: {
            value: 6,
            message: "Пароль не может быть короче 6 символов",
          },
          maxLength: {
            value: 50,
            message: "Длина пароля не должна превышать 50 символов",
          },
        })}
      />

      <TextField
        label="Новый пароль"
        fullWidth
        type="password"
        sx={{ mb: 2 }}
        error={Boolean(errors?.password)}
        helperText={errors?.password?.message}
        {...register("password", {
          required: {
            value: Boolean(watch("password")),
            message: "Поле обязательно для заполнения",
          },
          minLength: {
            value: 6,
            message: "Пароль не может быть короче 6 символов",
          },
          maxLength: {
            value: 50,
            message: "Длина пароля не должна превышать 50 символов",
          },
        })}
      />

      <TextField
        label="Повторите пароль"
        fullWidth
        type="password"
        error={Boolean(errors?.password_confirmation)}
        helperText={errors?.password_confirmation?.message}
        {...register("password_confirmation", {
          required: {
            value: Boolean(watch("password")),
            message: "Поле обязательно для заполнения",
          },
          minLength: {
            value: 6,
            message: "Пароль не может быть короче 6 символов",
          },
          maxLength: {
            value: 50,
            message: "Длина пароля не должна превышать 50 символов",
          },
          validate: (value: string | null | undefined) => {
            if (value && watch("password") !== value) {
              return "Пароли не совпадают";
            }
          },
        })}
      />

      <FormHelperText sx={{ mt: 1 }}>
        В случае смены пароля вам будет необходимо вновь авторизоваться
      </FormHelperText>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "end" }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
          Отменить
        </Button>

        <Button variant="contained" type="submit" disabled={btnLoading}>
          {btnLoading ? "Загрузка..." : "Сохранить"}
        </Button>
      </Box>
    </form>
  );
};
