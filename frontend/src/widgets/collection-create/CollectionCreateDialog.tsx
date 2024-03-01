import { Dialog, Divider, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { CollectionCreateForm } from "../../features/collection/create";

interface CollectionCreateProps {
  onClose: () => void;
  open: boolean;
}

export const CollectionCreateDialog: FC<CollectionCreateProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ pt: 1, pb: 2 }}>
          Создать коллекцию
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <CollectionCreateForm onClose={onClose} />
      </Paper>
    </Dialog>
  );
};
