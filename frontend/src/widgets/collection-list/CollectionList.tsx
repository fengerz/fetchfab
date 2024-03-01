import { FC } from "react";
import { Box, Skeleton } from "@mui/material";
import { CollectionItem } from "../../entities/collection";
import { ICollection } from "../../shared/api/ICollection";

type CollectionListProps = {
  collections: ICollection[];
  isLoading: boolean;
};

export const CollectionList: FC<CollectionListProps> = ({
  collections,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Box>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton variant="rounded" height={110} key={i} sx={{ mb: 2 }} />
          ))}
      </Box>
    );
  }

  return (
    <>
      {collections?.length > 0 ? (
        <Box>
          {collections?.map((collection: ICollection, i: number) => (
            <CollectionItem key={i} collection={collection} />
          ))}
        </Box>
      ) : (
        <Box>Нет результатов</Box>
      )}
    </>
  );
};
