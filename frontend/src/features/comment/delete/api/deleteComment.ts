import { showFailtureToast } from "../../../../app/store/appSlice";
import { useDestroyCommentMutation } from "../../../../entities/comment";
import { IComment } from "../../../../shared/api/IComment";
import { useAppDispatch } from "../../../../shared/hooks/redux";

type DeleteCommentProps = {
  productId: number;
  comment: IComment;
};

export const useDeleteComment = () => {
  const dispatch = useAppDispatch();
  const [destroyComment] = useDestroyCommentMutation();

  const deleteComment = async ({ productId, comment }: DeleteCommentProps) => {
    try {
      await destroyComment({
        productId,
        commentId: comment?.id,
      }).unwrap();
    } catch (error) {
      dispatch(showFailtureToast("Не удалось удалить комментарий"));
    }
  };

  return { deleteComment };
};
