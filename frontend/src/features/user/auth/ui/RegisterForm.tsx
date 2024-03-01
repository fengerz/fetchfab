import { FC, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import {
  useForm,
  SubmitHandler,
  UseFormSetError,
  FieldValues,
} from "react-hook-form";
import { useRegisterUser } from "../api/registerUser";
import { RegisterInputs } from "../types";

type RegisterFormProps = {
  setIsLogin: (value: boolean) => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ setIsLogin }) => {
  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const { registerUser } = useRegisterUser();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const onSuccess = () => {
    setIsLogin(true);
    setBtnLoading(false);
  };

  const onError = () => {
    setBtnLoading(false);
  };

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setBtnLoading(true);

    await registerUser({
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
        Регистрация
      </Typography>

      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Логин"
              autoFocus
              autoComplete="given-name"
              error={Boolean(errors?.name)}
              helperText={errors?.name?.message}
              {...register("name", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Логин не может быть короче 2 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Длина логина не должна превышать 50 символов",
                },
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              autoComplete="email"
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Пароль"
              type="password"
              autoComplete="new-password"
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="password"
              label="Пароль ещё раз"
              autoComplete="new-password"
              error={Boolean(errors?.password_confirmation)}
              helperText={errors?.password_confirmation?.message}
              {...register("password_confirmation", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 6,
                  message: "Пароль не может быть короче 6 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Длина пароля не должна превышать 50 символов",
                },
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Пароли не совпадают";
                  }
                },
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  color="primary"
                  {...register("terms", {
                    required: "Поле обязательно для заполнения",
                  })}
                />
              }
              label="Я соглашаюсь с условиями пользования"
            />

            {errors?.terms?.message && (
              <FormHelperText error>{errors?.terms?.message}</FormHelperText>
            )}
          </Grid>
        </Grid>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={btnLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {btnLoading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsLogin(true)}
            >
              Уже есть аккаунт? Авторизуйтесь
            </Link>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
