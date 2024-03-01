import { api } from "../../../shared/api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => ({
        url: "api/category",
      }),
    }),

    fetchCategoryProducts: builder.query({
      query: (slug: string) => ({
        url: `api/category/${slug}`,
      }),
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useFetchCategoryProductsQuery,
  useLazyFetchCategoryProductsQuery,
} = categoryApi;

export const {
  endpoints: { fetchCategories, fetchCategoryProducts },
} = categoryApi;
