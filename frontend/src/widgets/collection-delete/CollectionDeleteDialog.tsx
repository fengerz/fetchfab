import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ICollection } from "../../shared/api/ICollection";
import { Close } from "@mui/icons-material";
import { useDeleteCollection } from "../../features/collection/delete";
import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS_ROUTE } from "../../shared/config/consts";

type CollectionDeleteProps = {
  onClose: () => void;
  open: boolean;
  collection: ICollection;
};

export const CollectionDeleteDialog: FC<CollectionDeleteProps> = ({
  open,
  collection,
  onClose,
}) => {
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.user);

  const { deleteCollection } = useDeleteCollection();

  const onSuccess = () => {
    navigate("/" + currentUser?.name + COLLECTIONS_ROUTE);
  };

  const deleteHandle = () => {
    currentUser &&
      deleteCollection({ username: currentUser?.name, collection, onSuccess });

    onClose();
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
            Удаление коллекции
          </Typography>

          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Typography>
            Вы уверены, что хотите удалить коллекцию: "{collection?.title}"?
            <br />
            Будет удалена <strong>только коллекция</strong>. Модели из этой
            коллекции не будут удалены.
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ textAlign: "end", mt: 3 }}>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
            Отменить
          </Button>

          <Button variant="contained" color="error" onClick={deleteHandle}>
            Удалить
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
};
