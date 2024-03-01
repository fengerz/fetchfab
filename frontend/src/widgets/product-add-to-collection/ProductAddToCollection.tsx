import { AddRounded, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { useLazyFetchUserCollectionsQuery } from "../../entities/collection/api/collectionApi";
import { CollectionListing } from "../../features/product/add-to-collection";
import { IProduct } from "../../shared/api/IProduct";

interface ProductAddToCollectionProps {
  open: boolean;
  product: IProduct;
  onClose: () => void;
  handleAddCollection: () => void;
}

export const ProductAddToCollection: FC<ProductAddToCollectionProps> = ({
  product,
  open,
  onClose,
  handleAddCollection,
}) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [page, setPage] = useState<number>(1);

  const [
    fetchCollections,
    { data: collections, isLoading: collectionsLoading },
  ] = useLazyFetchUserCollectionsQuery();

  const handlePage = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    open &&
      fetchCollections({
        username: currentUser?.name,
        productId: product?.id,
        page,
      });
  }, [open, page]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant="h5">
            Добавить в коллекцию
          </Typography>

          <IconButton edge="start" onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <Typography variant="overline" sx={{ mb: 3 }}>
            Коллекции
          </Typography>

          <CollectionListing
            product={product}
            collections={collections?.data}
            isLoading={collectionsLoading}
          />

          {collections?.meta.last_page > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              {!collectionsLoading && (
                <Pagination
                  color="primary"
                  onChange={handlePage}
                  count={collections?.meta?.last_page}
                  page={collections?.meta?.current_page || 1}
                />
              )}
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Button
          sx={{ mt: 1.5 }}
          startIcon={<AddRounded />}
          onClick={handleAddCollection}
          variant="contained"
          fullWidth
        >
          Создать новую коллекцию
        </Button>
      </Paper>
    </Dialog>
  );
};
