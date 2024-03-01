import { FC } from "react";
import Pages from "../../shared/ui/Pages";
import { IMeta } from "../../shared/api/IMeta";
import { IProduct } from "../../shared/api/IProduct";
import { ProductCard } from "../../entities/product";
import { Box, Grid, Skeleton } from "@mui/material";

type ProductGridProps = {
  products: IProduct[];
  meta: IMeta;
  isLoading: boolean;
  hasMenu?: boolean;
  handleDestroy?: (product: IProduct) => void;
  handleUpdate?: (product: IProduct) => void;
  handleAddTo?: (product: IProduct) => void;
};

export const ProductGrid: FC<ProductGridProps> = ({
  meta,
  products,
  isLoading,
  hasMenu = false,
  handleDestroy,
  handleUpdate,
  handleAddTo,
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
      {products?.length > 0 ? (
        <Box>
          <Grid container spacing={4}>
            {products?.map((product: IProduct, i: number) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <ProductCard
                  product={product}
                  hasMenu={hasMenu}
                  handleDestroy={handleDestroy}
                  handleUpdate={handleUpdate}
                  handleAddTo={handleAddTo}
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
