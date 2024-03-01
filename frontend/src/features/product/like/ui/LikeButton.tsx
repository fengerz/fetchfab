import { StarBorderOutlined } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import { FC } from "react";
import { numberFormat } from "../../../../shared/lib/numberFormat";
import { IProduct } from "../../../../shared/api/IProduct";
import { useLikeProduct } from "../api/likeProduct";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks/redux";
import { openSignInDialog } from "../../../../app/store/appSlice";

type LikeButtonProps = {
  product: IProduct;
  isLoading: boolean;
};

export const LikeButton: FC<LikeButtonProps> = ({ product, isLoading }) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.user.isAuth);

  const { likeProduct } = useLikeProduct();

  const handleClick = () => {
    if (isAuth) {
      likeProduct(product);
    } else {
      dispatch(openSignInDialog());
    }
  };

  if (isLoading) {
    return <Skeleton variant="rounded" width={70} height={35} />;
  }

  return (
    <Button
      color="warning"
      onClick={handleClick}
      startIcon={<StarBorderOutlined />}
      variant={product?.is_liked ? "contained" : "outlined"}
    >
      {product?.likes_count && numberFormat(product?.likes_count)}
    </Button>
  );
};
