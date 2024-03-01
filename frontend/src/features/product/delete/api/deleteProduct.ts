import { showFailtureToast } from "../../../../app/store/appSlice";
import { useDestroyProductMutation } from "../../../../entities/product";
import { useAppDispatch } from "../../../../shared/hooks/redux";
import { IProduct } from "../../../../shared/api/IProduct";

type DeleteProductProps = {
  product: IProduct;
  onSuccess: () => void;
};

export const useDeleteProduct = () => {
  const dispatch = useAppDispatch();
  const [destroyProduct] = useDestroyProductMutation();

  const deleteProduct = async ({ product, onSuccess }: DeleteProductProps) => {
    try {
      await destroyProduct(product.id).unwrap();

      onSuccess();
    } catch (error) {
      dispatch(showFailtureToast("Не удалось удалить модель"));
    }
  };

  return { deleteProduct };
};
