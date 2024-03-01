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
import { FC } from "react";
import { useAppDispatch } from "../../shared/hooks/redux";
import { showSuccessToast } from "../../app/store/appSlice";

interface ProductShareProps {
  onClose: () => void;
  open: boolean;
}

export const ShareDialog: FC<ProductShareProps> = ({ onClose, open }) => {
  const dispatch = useAppDispatch();

  const copyHandle = () => {
    navigator.clipboard.writeText(document.location.toString());

    onClose();

    dispatch(showSuccessToast("Ссылка скопирована в буфер обмена"));
  };

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
            Поделиться
          </Typography>

          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
            Прямая ссылка
          </Typography>

          <form>
            <TextField value={document.location} hiddenLabel fullWidth />
          </form>

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
