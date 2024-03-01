import { api } from "../../../shared/api";
import getCsrfCookie from "../../../shared/lib/getCsrfCookie";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCsrf: builder.query({
      query: () => "/sanctum/csrf-cookie",
    }),

    fetchUser: builder.query({
      query: (username: string) => ({
        url: `/api/user/${username}`,
      }),
      providesTags: ["User"],
    }),

    auth: builder.query({
      query: () => "api/user",
      providesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/user/${id}`,
        method: "POST",
        body: data,
        headers: {
          Accept: "Application/json",
          "X-XSRF-TOKEN": getCsrfCookie(),
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetCsrfQuery,
  useFetchUserQuery,
  useAuthQuery,
  useLazyAuthQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: { getCsrf, fetchUser, auth, login, register, logout, updateUser },
} = userApi;
