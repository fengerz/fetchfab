import { Box, Divider } from "@mui/material";
import { CommentCard } from "../../entities/comment";
import { IComment } from "../../shared/api/IComment";
import { FC } from "react";
import { CommentDeleteButton } from "../../features/comment/delete";
import { useAppSelector } from "../../shared/hooks/redux";
import { IProduct } from "../../shared/api/IProduct";

type CommentListProps = {
  comments: IComment[];
  product: IProduct;
};

export const CommentList: FC<CommentListProps> = ({ comments, product }) => {
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <>
      {comments?.map((comment: IComment, i: number, arr) => (
        <Box key={i}>
          <Box sx={{ display: "flex" }}>
            <CommentCard comment={comment} productOwnerId={product?.user.id} />

            {comment?.user.id === currentUser?.id && (
              <CommentDeleteButton product={product} comment={comment} />
            )}
          </Box>
          {i < arr.length - 1 && <Divider sx={{ mb: 2 }} />}
        </Box>
      ))}
    </>
  );
};
