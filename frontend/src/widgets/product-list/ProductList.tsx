import { FC } from "react";
import { ProductItem } from "../../entities/product";
import { IProduct } from "../../shared/api/IProduct";
import { Box, Skeleton } from "@mui/material";

type ProductListProps = {
  products: IProduct[];
  isLoading: boolean;
};

export const ProductList: FC<ProductListProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <Box>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton variant="rounded" height={110} key={i} sx={{ mb: 2 }} />
          ))}
      </Box>
    );
  }

  return (
    <>
      {products?.length > 0 ? (
        <Box>
          {products?.map((product: IProduct, i: number) => (
            <ProductItem key={i} product={product} />
          ))}
        </Box>
      ) : (
        <Box>Нет результатов</Box>
      )}
    </>
  );
};
