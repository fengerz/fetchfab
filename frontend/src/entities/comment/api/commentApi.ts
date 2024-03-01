import { api } from "../../../shared/api";
import getCsrfCookie from "../../../shared/lib/getCsrfCookie";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchProductComments: builder.query({
      query: (slug: string) => ({
        url: `api/product/${slug}/comment`,
      }),
      providesTags: ["Comment"],
    }),

    storeComment: builder.mutation({
      query: ({ productId, data }) => ({
        url: `api/product/${productId}/comment`,
        body: data,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Comment"],
    }),

    destroyComment: builder.mutation({
      query: ({ productId, commentId }) => ({
        url: `api/product/${productId}/comment/${commentId}`,
        method: "DELETE",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useFetchProductCommentsQuery,
  useStoreCommentMutation,
  useDestroyCommentMutation,
} = commentApi;

export const {
  endpoints: { fetchProductComments, storeComment, destroyComment },
} = commentApi;
