import { Close, ContentCopy } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import { useAppDispatch } from "../../shared/hooks/redux";
import { showSuccessToast } from "../../app/store/appSlice";
import { IProduct } from "../../shared/api/IProduct";
import { PRODUCTS_ROUTE } from "../../shared/config/consts";

type ProductPublishedProps = {
  open: boolean;
  onClose: () => void;
  product: IProduct;
};

export const ProductPublishedDialog: FC<ProductPublishedProps> = ({
  open,
  onClose,
  product,
}) => {
  const dispatch = useAppDispatch();

  const productUrl =
    document.location.origin + PRODUCTS_ROUTE + "/" + product.slug;

  const copyHandle = () => {
    navigator.clipboard.writeText(productUrl);

    onClose();

    dispatch(showSuccessToast("Ссылка скопирована в буфер обмена"));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{ width: "500px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            p: 1,
          }}
        >
          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 2,
          }}
        >
          <img src="/static/images/Completed.png" width={300} height={300} />

          <Typography paragraph variant="h5">
            Ваша модель была успешно опубликована
          </Typography>

          <Button variant="contained" sx={{ mb: 3, mt: 2 }} href={productUrl}>
            Посмотреть модель
          </Button>
        </Box>

        <Divider />

        <Box sx={{ bgcolor: grey[200], p: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
            Прямая ссылка
          </Typography>

          <TextField
            value={productUrl}
            hiddenLabel
            fullWidth
            sx={{ bgcolor: "white" }}
          />

          <Button
            startIcon={<ContentCopy />}
            variant="contained"
            onClick={copyHandle}
            sx={{ mt: 1.5, width: "100%" }}
          >
            Скопировать
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
};
