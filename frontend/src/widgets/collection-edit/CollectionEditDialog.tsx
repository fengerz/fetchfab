import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ICollection } from "../../shared/api/ICollection";
import { Close } from "@mui/icons-material";
import { CollectionEditForm } from "../../features/collection/edit";

type CollectionEditProps = {
  onClose: () => void;
  open: boolean;
  collection: ICollection;
};

export const CollectionEditDialog: FC<CollectionEditProps> = ({
  onClose,
  open,
  collection,
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
            Свойства коллекции
          </Typography>

          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <CollectionEditForm collection={collection} onClose={onClose} />
      </Paper>
    </Dialog>
  );
};
