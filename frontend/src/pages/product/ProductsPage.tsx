import { useEffect } from "react";
import { Typography } from "@mui/material";
import Wrapper from "../../shared/ui/Wrapper";
import { ProductGrid } from "../../widgets/product-grid";
import { useParams, useSearchParams } from "react-router-dom";
import { useFetchProductsQuery } from "../../entities/product";
import { ProductsFilters } from "../../features/product/filter";

type ProductsPageProps = {
  slug?: string;
  tag?: string;
};

const ProductsPage = () => {
  const { slug: categorySlug, tag: tagSlug } = useParams<ProductsPageProps>();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;
  const category = searchParams.get("category") || categorySlug;
  const tag = searchParams.get("tag") || tagSlug;
  const period = searchParams.get("period") || 31;
  const sort = searchParams.get("sort") || "likeCount";
  const page = searchParams.get("page") || 1;

  const { data: products, isLoading: productsLoading } = useFetchProductsQuery({
    query,
    category,
    period,
    tag,
    sort,
    page,
  });

  useEffect(() => {
    document.title = "Популярные 3D модели - FetchFab";
  }, []);

  return (
    <>
      <ProductsFilters />

      <Wrapper
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography component="h4" paragraph variant="h4">
          Модели
        </Typography>

        <ProductGrid
          products={products?.data}
          meta={products?.meta}
          isLoading={productsLoading}
        />
      </Wrapper>
    </>
  );
};

export default ProductsPage;
