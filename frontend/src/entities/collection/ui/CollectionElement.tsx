import { FC } from "react";
import { ICollection } from "../../../shared/api/ICollection";
import { Box, Typography } from "@mui/material";
import { ViewInAr } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

type CollectionElementProps = {
  collection: ICollection;
};

export const CollectionElement: FC<CollectionElementProps> = ({
  collection,
}) => {
  return (
    <Box
      key={collection?.slug}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {collection?.products_count > 0 ? (
          <img
            src={
              collection?.poster_products[0]
                ? collection?.poster_products[0].toString()
                : "/static/icons/cube.png"
            }
            height={50}
          />
        ) : (
          <Box
            sx={{
              height: 50,
              width: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: grey[300],
              borderRadius: 2,
            }}
          >
            <ViewInAr sx={{ color: grey[500] }} />
          </Box>
        )}

        <Box sx={{ ml: 1 }}>
          <Typography>{collection?.title}</Typography>

          <Typography variant="body2" color="text.secondary">
            Моделей: {collection?.products_count || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
