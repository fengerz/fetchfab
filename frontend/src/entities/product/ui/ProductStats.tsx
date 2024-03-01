import {
  ChatBubbleOutlineRounded,
  StarBorderOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { IProduct } from "../../../shared/api/IProduct";
import { FC } from "react";
import { numberFormat } from "../../../shared/lib/numberFormat";

type ProductStatsProps = {
  product: IProduct;
};

export const ProductStats: FC<ProductStatsProps> = ({ product }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        component="div"
        variant="subtitle2"
        color="text.disabled"
        sx={{ mr: 1, display: "flex", alignItems: "center" }}
      >
        <VisibilityOutlined fontSize="small" sx={{ mr: 0.25 }} />{" "}
        {product?.views_count && numberFormat(product?.views_count)}
      </Typography>

      <Typography
        component="div"
        variant="subtitle2"
        color="text.disabled"
        sx={{ mr: 1, display: "flex", alignItems: "center" }}
      >
        <ChatBubbleOutlineRounded fontSize="small" sx={{ mr: 0.25 }} />{" "}
        {product?.comments_count && numberFormat(product?.comments_count)}
      </Typography>

      <Typography
        component="div"
        variant="subtitle2"
        color="text.disabled"
        sx={{
          mr: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <StarBorderOutlined fontSize="small" sx={{ mr: 0.25 }} />{" "}
        {product?.likes_count && numberFormat(product?.likes_count)}
      </Typography>
    </Box>
  );
};
