import { FC } from "react";
import { IProduct } from "../../shared/api/IProduct";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { ProductDeleteButton } from "../../features/product/delete";

type ProductDeleteProps = {
  onClose: () => void;
  open: boolean;
  product: IProduct;
};

export const ProductDeleteDialog: FC<ProductDeleteProps> = ({
  onClose,
  open,
  product,
}) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography sx={{ flex: 1 }} variant="h5">
            Удаление модели
          </Typography>

          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Typography>
            Модель <strong>{product?.title}</strong> будет удалена.{" "}
            <strong>Это действие нельзя будет отменить.</strong>
            <br />
            Удалить эту модель навсегда?
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ textAlign: "end", mt: 3 }}>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
            Отменить
          </Button>

          <ProductDeleteButton product={product} onClose={onClose} />
        </Box>
      </Paper>
    </Dialog>
  );
};
