import { FieldValues, UseFormSetError } from "react-hook-form";
import { useStoreProductMutation } from "../../../../entities/product";
import { useValidationErrors } from "../../../../shared/hooks/validationErrors";
import { IProduct } from "../../../../shared/api/IProduct";

type CreateProductProps = {
  data: FormData;
  setError: UseFormSetError<FieldValues>;
  onSubmit: (product: IProduct) => void;
  onError: () => void;
};

export const useCreateProduct = () => {
  const [storeProduct] = useStoreProductMutation();
  const { handleErrors } = useValidationErrors();

  const createProduct = async ({
    data,
    setError,
    onError,
    onSubmit,
  }: CreateProductProps) => {
    try {
      const response = await storeProduct(data).unwrap();
      onSubmit(response.data);
    } catch (error) {
      onError();

      const errorMessage = "Ошибка при публикации модели";

      handleErrors({ error, errorMessage, setError });
    }
  };

  return { createProduct };
};
