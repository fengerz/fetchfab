import { api } from "../../../shared/api";
import getCsrfCookie from "../../../shared/lib/getCsrfCookie";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: ({
        query = undefined,
        category = undefined,
        period = undefined,
        tag = undefined,
        sort = undefined,
        page = 1,
      }) => ({
        url: "api/product",
        params: {
          query,
          category,
          period,
          tag,
          sort,
          page,
        },
      }),
      providesTags: ["Product"],
    }),

    fetchOneProduct: builder.query({
      query: (slug: string) => ({
        url: `api/product/${slug}`,
      }),
      providesTags: ["Product"],
    }),

    fetchSuggestsProducts: builder.query({
      query: ({ slug, page = 1 }) => ({
        url: `api/product/${slug}/suggests`,
        params: { page },
      }),
      // providesTags: ["Product"],
    }),

    fetchProductCollections: builder.query({
      query: (slug: string) => ({
        url: `api/product/${slug}/collections`,
      }),
    }),

    fetchUserProducts: builder.query({
      query: ({ username, page = 1 }) => ({
        url: `api/user/${username}/models`,
        params: { page },
      }),
      providesTags: ["Product"],
    }),

    fetchUserLikedProducts: builder.query({
      query: ({ username, page = 1 }) => ({
        url: `api/user/${username}/likes`,
        params: { page },
      }),
      providesTags: ["Product"],
    }),

    fetchCollectionProducts: builder.query({
      query: ({ username, slug, page = 1 }) => ({
        url: `api/user/${username}/collections/${slug}/models`,
        params: { page },
      }),
      providesTags: ["Product"],
    }),

    fetchTopProducts: builder.query({
      query: () => ({
        url: "api/product/top",
      }),
    }),

    downloadProduct: builder.query({
      query: (id: number) => ({
        url: `/api/product/${id}/download`,
        responseHandler: async (response) => {
          const blobData = await response.blob();
          const url = URL.createObjectURL(blobData);

          return url;
        },
        cache: "no-cache",
      }),
    }),

    storeProduct: builder.mutation({
      query: (data) => ({
        url: "/api/product",
        body: data,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/product/${id}`,
        body: data,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Product"],
    }),

    likeProduct: builder.mutation({
      query: (id: number) => ({
        url: `/api/product/${id}/like`,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Product"],
    }),

    productCollection: builder.mutation({
      query: ({ productId, collectionId }) => ({
        url: `/api/product/${productId}/collection/${collectionId}`,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Collection"],
    }),

    destroyProduct: builder.mutation({
      query: (id: number) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useFetchOneProductQuery,
  useFetchSuggestsProductsQuery,
  useFetchProductCollectionsQuery,
  useFetchProductsQuery,
  useLazyFetchUserProductsQuery,
  useLazyFetchUserLikedProductsQuery,
  useLazyFetchCollectionProductsQuery,
  useFetchTopProductsQuery,
  useLazyDownloadProductQuery,
  useStoreProductMutation,
  useUpdateProductMutation,
  useLikeProductMutation,
  useProductCollectionMutation,
  useDestroyProductMutation,
} = productApi;

export const {
  endpoints: {
    fetchProducts,
    fetchOneProduct,
    fetchSuggestsProducts,
    fetchProductCollections,
    fetchUserLikedProducts,
    fetchCollectionProducts,
    fetchTopProducts,
    downloadProduct,
    storeProduct,
    updateProduct,
    likeProduct,
    productCollection,
    destroyProduct,
  },
} = productApi;
