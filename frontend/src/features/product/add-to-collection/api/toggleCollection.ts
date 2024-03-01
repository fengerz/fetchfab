import { showFailtureToast } from "../../../../app/store/appSlice";
import { useProductCollectionMutation } from "../../../../entities/product";
import { useAppDispatch } from "../../../../shared/hooks/redux";

type ToggleCollectionProps = {
  productId: number;
  collectionId: number;
  type: string;
};

export const useToggleCollection = () => {
  const dispatch = useAppDispatch();
  const [handleCollection] = useProductCollectionMutation();

  const toggleCollection = async ({
    productId,
    collectionId,
    type,
  }: ToggleCollectionProps) => {
    try {
      await handleCollection({ productId, collectionId }).unwrap();
    } catch (error) {
      if (type === "add") {
        dispatch(showFailtureToast("Ошибка при добавлении в коллекцию"));
      } else if (type === "remove") {
        dispatch(showFailtureToast("Ошибка при удалении из коллекции"));
      }
    }
  };

  return { toggleCollection };
};
