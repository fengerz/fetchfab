import { FieldValues, UseFormSetError } from "react-hook-form";
import { useUpdateProductMutation } from "../../../../entities/product";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";

type EditProductProps = {
  id: number;
  data: FormData;
  onError: () => void;
  onSubmit: (slug: string) => void;
  setError: UseFormSetError<FieldValues>;
};

export const useEditProduct = () => {
  const [storeProduct] = useUpdateProductMutation();
  const { handleErrors } = useValidationErrors();

  const updateProduct = async ({
    id,
    data,
    setError,
    onSubmit,
    onError,
  }: EditProductProps) => {
    try {
      const response = await storeProduct({ data, id }).unwrap();

      onSubmit(response.data.slug);
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при изменении модели";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { updateProduct };
};
