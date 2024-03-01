import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useDeleteComment } from "../api/deleteComment";
import { IComment } from "../../../../shared/api/IComment";
import { FC } from "react";
import { IProduct } from "../../../../shared/api/IProduct";

type CommentDeleteButtonProps = {
  product: IProduct;
  comment: IComment;
};

export const CommentDeleteButton: FC<CommentDeleteButtonProps> = ({
  product,
  comment,
}) => {
  const { deleteComment } = useDeleteComment();

  const handleClick = () => {
    deleteComment({ productId: product?.id, comment });
  };

  return (
    <Box>
      <IconButton aria-label="delete" size="small" onClick={handleClick}>
        <Delete />
      </IconButton>
    </Box>
  );
};
