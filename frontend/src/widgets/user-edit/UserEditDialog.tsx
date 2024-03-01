import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { UserEditForm } from "../../features/user/edit";

type UserEditProps = {
  onClose: () => void;
  open: boolean;
};

export const UserEditDialog: FC<UserEditProps> = ({ onClose, open }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant="h5">
            Редактирование профиля
          </Typography>

          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <UserEditForm onClose={onClose} />
      </Paper>
    </Dialog>
  );
};
