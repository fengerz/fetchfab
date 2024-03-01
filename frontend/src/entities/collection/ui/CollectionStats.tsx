import { FC } from "react";
import { ICollection } from "../../../shared/api/ICollection";
import { Typography } from "@mui/material";
import { ViewInAr } from "@mui/icons-material";

type CollectionStatsProps = {
  collection: ICollection;
};

export const CollectionStats: FC<CollectionStatsProps> = ({ collection }) => {
  return (
    <Typography
      component="div"
      color="text.disabled"
      variant="subtitle2"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <ViewInAr fontSize="small" sx={{ mr: 0.25 }} />{" "}
      {collection?.products_count}
    </Typography>
  );
};
