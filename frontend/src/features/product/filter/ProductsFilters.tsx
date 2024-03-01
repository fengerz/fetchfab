import { FC } from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ICategory } from "../../../shared/api/ICategory";
import { useFetchCategoriesQuery } from "../../../entities/category/api/categoryApi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CATEGORY_ROUTE,
  POPULAR_ROUTE,
  PRODUCTS_ROUTE,
  SEARCH_ROUTE,
} from "../../../shared/config/consts";

type ProductsFiltersProps = {
  slug?: string;
};

export const ProductsFilters: FC = () => {
  const { slug: categorySlug } = useParams<ProductsFiltersProps>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: categories, isLoading: categoriesLoading } =
    useFetchCategoriesQuery("");

  const category = searchParams.get("category") || categorySlug;
  const period = searchParams.get("period") || 31;
  const sort = searchParams.get("sort") || "likeCount";

  const isSearchRoute =
    window.location.pathname === SEARCH_ROUTE ||
    window.location.pathname + "/" === SEARCH_ROUTE;

  const handleParams = ($param: string, $value: string) => {
    searchParams.set($param, $value);
    setSearchParams(searchParams);
  };

  const handleCategory = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    if (isSearchRoute) {
      searchParams.set("category", value);
      setSearchParams(searchParams);
    } else {
      navigate(
        PRODUCTS_ROUTE + value === "popular"
          ? POPULAR_ROUTE
          : PRODUCTS_ROUTE + CATEGORY_ROUTE + "/" + event.target.value
      );
    }
  };

  return (
    <Box>
      <Box sx={{ pl: 3, pt: 1 }}>
        <Grid container spacing={3}>
          <Grid item lg={2} sm={4}>
            <FormControl fullWidth size="small" variant="standard">
              <InputLabel
                id="category-select-label"
                sx={{ textTransform: "uppercase", color: "text.disabled" }}
              >
                Категория
              </InputLabel>
              <Select
                labelId="category-select-label"
                label="Категория"
                value={category || "popular"}
                onChange={handleCategory}
              >
                <MenuItem value={"popular"}>Все категории</MenuItem>

                {!categoriesLoading &&
                  categories?.data.map((category: ICategory) => (
                    <MenuItem value={category.slug} key={category.slug}>
                      {category.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={2} sm={4}>
            <FormControl fullWidth size="small" variant="standard">
              <InputLabel
                id="period-select-label"
                sx={{ textTransform: "uppercase", color: "text.disabled" }}
              >
                Период
              </InputLabel>
              <Select
                labelId="period-select-label"
                label="Период"
                value={period}
                onChange={(e) =>
                  handleParams("period", e.target.value.toString())
                }
              >
                <MenuItem value={0}>Всё время</MenuItem>
                <MenuItem value={31}>Этот месяц</MenuItem>
                <MenuItem value={7}>Эта неделя</MenuItem>
                <MenuItem value={365}>Этот год</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={2} sm={4}>
            <FormControl fullWidth size="small" variant="standard">
              <InputLabel
                id="sort-select-label"
                sx={{ textTransform: "uppercase", color: "text.disabled" }}
              >
                Сортировать по
              </InputLabel>
              <Select
                labelId="sort-select-label"
                label="Сортировка"
                value={sort}
                onChange={(e) => handleParams("sort", e.target.value)}
              >
                <MenuItem value={"likeCount"}>Лайкам</MenuItem>
                <MenuItem value={"viewCount"}>Просмотрам</MenuItem>
                <MenuItem value={"commentCount"}>Комментариям</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Divider />
    </Box>
  );
};
