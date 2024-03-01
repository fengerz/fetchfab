import { FC } from "react";

import { Box, Button, Skeleton } from "@mui/material";
import { ICollection } from "../../../../shared/api/ICollection";
import { IProduct } from "../../../../shared/api/IProduct";
import { useToggleCollection } from "../api/toggleCollection";
import { CollectionElement } from "../../../../entities/collection";

type CollectionListingProps = {
  product: IProduct;
  collections: ICollection[];
  isLoading: boolean;
};

export const CollectionListing: FC<CollectionListingProps> = ({
  product,
  collections,
  isLoading,
}) => {
  const { toggleCollection } = useToggleCollection();

  const handleButton = (id: number, type: string) => {
    toggleCollection({
      productId: product?.id,
      collectionId: id,
      type: type,
    });
  };

  if (isLoading) {
    return <Skeleton variant="rounded" height={50} sx={{ mb: 1 }} />;
  }

  return (
    <Box mb={2}>
      {collections?.length > 0 ? (
        collections.map((collection) => (
          <Box
            key={collection?.slug}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <CollectionElement collection={collection} />

            <Box>
              {collection?.has_product ? (
                <Button
                  variant="contained"
                  onClick={() => handleButton(collection?.id, "remove")}
                  color="warning"
                >
                  Добавлено
                </Button>
              ) : (
                <Button onClick={() => handleButton(collection?.id, "add")}>
                  Добавить
                </Button>
              )}
            </Box>
          </Box>
        ))
      ) : (
        <Box>Список пуст</Box>
      )}
    </Box>
  );
};
