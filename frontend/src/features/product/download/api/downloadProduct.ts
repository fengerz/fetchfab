import { showFailtureToast } from "../../../../app/store/appSlice";
import { useLazyDownloadProductQuery } from "../../../../entities/product";
import { IProduct } from "../../../../shared/api/IProduct";
import { useAppDispatch } from "../../../../shared/hooks/redux";

export const useDownloadProduct = () => {
  const dispatch = useAppDispatch();

  const [downloadFile] = useLazyDownloadProductQuery();

  const downloadProduct = async (product: IProduct) => {
    try {
      return await downloadFile(product?.id).unwrap();
    } catch (error) {
      dispatch(showFailtureToast("Ошибка загрузки модели!"));
    }
  };

  return { downloadProduct };
};
