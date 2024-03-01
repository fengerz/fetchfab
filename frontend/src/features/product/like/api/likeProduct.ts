import { showFailtureToast } from "../../../../app/store/appSlice";
import { useLikeProductMutation } from "../../../../entities/product";
import { IProduct } from "../../../../shared/api/IProduct";
import { useAppDispatch } from "../../../../shared/hooks/redux";

export const useLikeProduct = () => {
  const dispatch = useAppDispatch();

  const [like] = useLikeProductMutation();

  const likeProduct = async (product: IProduct) => {
    try {
      await like(product?.id).unwrap();
    } catch (error) {
      dispatch(showFailtureToast("Ошибка соединения с сервером!"));
    }
  };

  return { likeProduct };
};
