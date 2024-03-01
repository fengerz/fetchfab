import { FC, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormSetError,
} from "react-hook-form";
import { useLoginUser } from "../api/loginUser";
import { useNavigate } from "react-router-dom";
import {
  POPULAR_ROUTE,
  PRODUCTS_ROUTE,
} from "../../../../shared/config/consts";
import { LoginInputs } from "../types";

type LoginFormProps = {
  setIsLogin: (value: boolean) => void;
  onClose?: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({
  setIsLogin,
  onClose = null,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>();

  const { loginUser } = useLoginUser();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleClose = () => {
    setBtnLoading(false);
    onClose && onClose();
  };

  const onSuccess = () => {
    handleClose();
    navigate(PRODUCTS_ROUTE + POPULAR_ROUTE);
  };

  const onError = () => {
    setBtnLoading(false);
  };

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setBtnLoading(true);

    await loginUser({
      data,
      onError,
      onSuccess,
      setError: setError as UseFormSetError<FieldValues>,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Avatar sx={{ m: 1, bgcolor: "primary.main", mx: "auto" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h5" variant="h5" textAlign="center">
        Авторизация
      </Typography>

      <Box sx={{ mt: 1 }}>
        <TextField
          autoFocus
          required
          fullWidth
          type="email"
          label="Email"
          autoComplete="email"
          margin="normal"
          error={Boolean(errors?.email)}
          helperText={errors?.email?.message}
          {...register("email", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 6,
              message: "Email не может быть короче 6 символов",
            },
            maxLength: {
              value: 50,
              message: "Длина Email не должна превышать 50 символов",
            },
          })}
        />

        <TextField
          required
          fullWidth
          margin="normal"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          error={Boolean(errors?.password)}
          helperText={errors?.password?.message}
          {...register("password", {
            required: "Поле обязательно для заполнения",
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

        <FormControlLabel
          control={<Checkbox color="primary" {...register("remember")} />}
          label="Запомнить"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={btnLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {btnLoading ? "Загрузка..." : "Войти"}
        </Button>

        <Link
          component="button"
          variant="body2"
          onClick={() => setIsLogin(false)}
        >
          Нет аккаунта? Зарегистрируйтесь
        </Link>
      </Box>
    </form>
  );
};
