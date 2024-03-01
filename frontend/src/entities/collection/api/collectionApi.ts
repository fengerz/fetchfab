import { api } from "../../../shared/api";
import getCsrfCookie from "../../../shared/lib/getCsrfCookie";

export const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserCollections: builder.query({
      query: ({ username, page = 1, productId = undefined }) => ({
        url: `api/user/${username}/collection`,
        params: {
          page,
          product_id: productId,
        },
      }),
      providesTags: ["Collection"],
    }),

    fetchOneCollection: builder.query({
      query: ({ username, slug }) => ({
        url: `api/user/${username}/collection/${slug}`,
      }),
      providesTags: ["Collection"],
    }),

    storeCollection: builder.mutation({
      query: ({ username, data }) => ({
        url: `api/user/${username}/collection`,
        body: data,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Collection"],
    }),

    updateCollection: builder.mutation({
      query: ({ username, data, id }) => ({
        url: `api/user/${username}/collection/${id}`,
        body: data,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Collection"],
    }),

    destroyCollection: builder.mutation({
      query: ({ username, id }) => ({
        url: `api/user/${username}/collection/${id}`,
        method: "DELETE",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useFetchUserCollectionsQuery,
  useLazyFetchUserCollectionsQuery,
  useFetchOneCollectionQuery,
  useLazyFetchOneCollectionQuery,
  useStoreCollectionMutation,
  useUpdateCollectionMutation,
  useDestroyCollectionMutation,
} = collectionApi;

export const {
  endpoints: {
    fetchUserCollections,
    fetchOneCollection,
    storeCollection,
    updateCollection,
    destroyCollection,
  },
} = collectionApi;
