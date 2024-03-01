import { ForwardedRef, forwardRef } from "react";
import { useEditProduct } from "../api/editProduct";
import { IProduct } from "../../../../shared/api/IProduct";
import { ICategory } from "../../../../shared/api/ICategory";
import { useAppSelector } from "../../../../shared/hooks/redux";
import { MuiChipsInput } from "mui-chips-input";
import {
  SubmitHandler,
  useForm,
  Controller,
  UseFormSetError,
  FieldValues,
} from "react-hook-form";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ProductInputs } from "../types";

type ProductEditProps = {
  product: IProduct;
  file?: File | null;
  poster?: File | null;
  onError: () => void;
  onSubmit: (slug: string) => void;
};

export const ProductEditForm = forwardRef<HTMLInputElement, ProductEditProps>(
  (
    { product, file = null, poster = null, onSubmit, onError },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { categories } = useAppSelector((state) => state.category);
    const { updateProduct } = useEditProduct();

    const {
      handleSubmit,
      register,
      control,
      setError,
      formState: { errors },
    } = useForm<ProductInputs>({
      defaultValues: {
        title: product?.title,
        description: product?.description || "",
        tags: product?.tags ? product?.tags.split(",") : [],
      },
    });

    const handleFormSubmit: SubmitHandler<ProductInputs> = async (data) => {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key as keyof ProductInputs];

        formData.append(key, String(value));
      }

      poster && formData.append("poster", poster);
      file && formData.append("uploaded_file", file);

      await updateProduct({
        id: product?.id,
        data: formData,
        onError,
        onSubmit,
        setError: setError as UseFormSetError<FieldValues>,
      });
    };

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mb={2}>
          <TextField
            label="Заголовок"
            required
            fullWidth
            sx={{ bgcolor: "white" }}
            error={Boolean(errors?.title)}
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

          {errors?.title?.message && (
            <FormHelperText error sx={{ ml: 1, mt: 1 }}>
              {errors?.title?.message}
            </FormHelperText>
          )}
        </Box>

        <Box mb={2}>
          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={6}
            sx={{ bgcolor: "white" }}
            error={Boolean(errors?.description)}
            {...register("description", {
              maxLength: {
                value: 255,
                message: "Описание не должно быть длиннее 255 символов",
              },
            })}
          />

          {errors?.description?.message && (
            <FormHelperText error sx={{ ml: 1, mt: 1 }}>
              {errors?.description?.message}
            </FormHelperText>
          )}
        </Box>

        <Box mb={2}>
          <FormControl fullWidth sx={{ bgcolor: "white" }}>
            <InputLabel>Категория</InputLabel>
            <Select
              required
              label="Категория"
              defaultValue={product?.category.id}
              error={Boolean(errors?.category)}
              {...register("category", {
                required: "Поле обязательно для заполнения",
              })}
            >
              {categories?.map((category: ICategory) => (
                <MenuItem key={category?.id} value={category?.id}>
                  {category?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {errors?.category?.message && (
            <FormHelperText error sx={{ ml: 1, mt: 1 }}>
              {errors?.category?.message}
            </FormHelperText>
          )}
        </Box>

        <Box>
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <MuiChipsInput
                {...field}
                fullWidth
                label="Теги"
                placeholder="Введите тег и нажмите Enter"
                error={fieldState.invalid}
                sx={{ bgcolor: "white" }}
              />
            )}
          />

          {errors?.tags?.message && (
            <FormHelperText error sx={{ ml: 1, mt: 1 }}>
              {errors?.tags?.message}
            </FormHelperText>
          )}

          <FormHelperText sx={{ ml: 1 }}>
            Дважды нажмите на тег для редактирования
          </FormHelperText>
        </Box>

        <input ref={ref} type="submit" style={{ display: "none" }}></input>
      </form>
    );
  }
);
