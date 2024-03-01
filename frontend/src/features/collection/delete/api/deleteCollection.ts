import { showFailtureToast } from "../../../../app/store/appSlice";
import { useDestroyCollectionMutation } from "../../../../entities/collection";
import { ICollection } from "../../../../shared/api/ICollection";
import { useAppDispatch } from "../../../../shared/hooks/redux";

type DeleteCollectionProps = {
  username: string;
  collection: ICollection;
  onSuccess: () => void;
};

export const useDeleteCollection = () => {
  const dispatch = useAppDispatch();

  const [destroyCollection] = useDestroyCollectionMutation();

  const deleteCollection = async ({
    username,
    collection,
    onSuccess,
  }: DeleteCollectionProps) => {
    try {
      await destroyCollection({ username, id: collection?.id }).unwrap();

      onSuccess();
    } catch (error) {
      dispatch(showFailtureToast("Ошибка при удалении коллекции"));
    }
  };

  return { deleteCollection };
};
