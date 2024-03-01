import {
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { SettingsRounded, Share } from "@mui/icons-material";
import { useFetchOneCollectionQuery } from "../../entities/collection";
import { ShareDialog } from "../share-dialog";
import { CollectionDeleteDialog } from "../collection-delete";
import { CollectionEditDialog } from "../collection-edit";
import { useAppSelector } from "../../shared/hooks/redux";

type CollectionDetailsProps = {
  username: string;
  slug: string;
};

export const CollectionDetails: FC<CollectionDetailsProps> = ({
  username,
  slug,
}) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: collection, isLoading: collectionLoading } =
    useFetchOneCollectionQuery({ username, slug });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    setDeleteOpen(true);
  };

  const handleEdit = () => {
    handleClose();
    setEditOpen(true);
  };

  return (
    <>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Divider sx={{ mb: 1 }} />

          <Grid
            container
            alignItems={{ xs: "start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            gap={1}
          >
            <Grid item xs={12} md>
              <Typography variant="h4">
                {collectionLoading ? (
                  <Skeleton component="span" width={250} />
                ) : (
                  collection?.data.title
                )}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {collectionLoading ? (
                  <Skeleton component="span" width={200} />
                ) : (
                  "Моделей: " + collection?.data.products_count || 0
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} textAlign={{ xs: "start", md: "end" }}>
              <Button
                startIcon={<Share />}
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => setShareOpen(true)}
                disabled={collectionLoading}
              >
                Поделиться
              </Button>

              {currentUser?.name === username && (
                <Button
                  startIcon={<SettingsRounded />}
                  variant="outlined"
                  onClick={handleClick}
                  disabled={collectionLoading}
                >
                  Настройки
                </Button>
              )}

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
                <MenuItem onClick={handleDelete}>Удалить</MenuItem>
              </Menu>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 1 }} />

          {collectionLoading
            ? Array(2)
                .fill(0)
                .map((_, i) => <Skeleton component="span" key={i} />)
            : collection?.data.description && (
                <Typography sx={{ mt: 2 }}>
                  {collection?.data.description}
                </Typography>
              )}
        </Box>
      </Box>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} />

      <CollectionDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        collection={collection?.data}
      />

      <CollectionEditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        collection={collection?.data}
      />
    </>
  );
};
