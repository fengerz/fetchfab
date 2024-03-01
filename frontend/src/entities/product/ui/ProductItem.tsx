import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import { ProductStats } from "./ProductStats";
import { IProduct } from "../../../shared/api/IProduct";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../../../shared/config/consts";

type ProductItemProps = {
  product: IProduct;
};

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <Card
      sx={{
        mb: 2,
        height: 110,
        display: "flex",
      }}
    >
      <Link to={PRODUCTS_ROUTE + "/" + product?.slug}>
        <Box
          sx={{
            px: 3,
            width: 170,
            height: "100%",
            background: "radial-gradient(circle, #555 0%, #111 100%)",
          }}
        >
          <CardMedia
            image={product?.poster ? product.poster : "/static/icons/cube.png"}
            sx={{
              mx: "auto",
              height: "100%",
              backgroundSize: product?.poster ? "contain" : "auto",
            }}
          />
        </Box>
      </Link>

      <Box sx={{ overflow: "hidden", flexGrow: 0 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to={PRODUCTS_ROUTE + "/" + product?.slug}>
            <Typography
              sx={{
                width: "100%",
                verticalAlign: "top",
                display: "inline-block",
              }}
              component="span"
              variant="body1"
              noWrap
            >
              {product?.title}
            </Typography>
          </Link>

          <Link to={"/" + product?.user.name}>
            <Typography component="span" variant="body2" color="text.secondary">
              {product?.user.name}
            </Typography>
          </Link>
        </CardContent>

        <Box sx={{ pl: 2 }}>
          <ProductStats product={product} />
        </Box>
      </Box>
    </Card>
  );
};
