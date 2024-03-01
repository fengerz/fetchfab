import { Button } from "@mui/material";
import { useDeleteProduct } from "../api/deleteProduct";
import { FC } from "react";
import { IProduct } from "../../../../shared/api/IProduct";
import { MODELS_ROUTE } from "../../../../shared/config/consts";
import { useNavigate } from "react-router-dom";

type ProductDeleteButtonProps = {
  product: IProduct;
  onClose: () => void;
};

export const ProductDeleteButton: FC<ProductDeleteButtonProps> = ({
  product,
  onClose,
}) => {
  const navigate = useNavigate();

  const { deleteProduct } = useDeleteProduct();

  const onSuccess = () => {
    navigate("/" + product.user.name + MODELS_ROUTE);
  };

  const handleClick = () => {
    onClose();

    deleteProduct({ product, onSuccess });
  };

  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Удалить модель
    </Button>
  );
};
