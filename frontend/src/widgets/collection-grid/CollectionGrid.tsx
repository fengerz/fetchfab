import { FC } from "react";
import Pages from "../../shared/ui/Pages";
import { IMeta } from "../../shared/api/IMeta";
import { Box, Grid, Skeleton } from "@mui/material";
import { CollectionCard } from "../../entities/collection";
import { ICollection } from "../../shared/api/ICollection";

type CollectionGridProps = {
  collections: ICollection[];
  meta: IMeta;
  isLoading: boolean;
  hasMenu?: boolean;
  handleUpdate?: (collection: ICollection) => void;
  handleDestroy?: (collection: ICollection) => void;
};

export const CollectionGrid: FC<CollectionGridProps> = ({
  collections,
  meta,
  isLoading,
  hasMenu = false,
  handleUpdate,
  handleDestroy,
}) => {
  if (isLoading) {
    return (
      <Grid container spacing={4}>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Skeleton variant="rounded" height={320} />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <>
      {collections?.length > 0 ? (
        <Box>
          <Grid container spacing={4}>
            {collections?.map((collection: ICollection, i: number) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <CollectionCard
                  collection={collection}
                  hasMenu={hasMenu}
                  handleDestroy={handleDestroy}
                  handleUpdate={handleUpdate}
                />
              </Grid>
            ))}
          </Grid>

          <Pages meta={meta} isLoading={isLoading} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          Нет результатов
        </Box>
      )}
    </>
  );
};
