import { apiSlice } from "../api/apiSlice";

interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  [key: string]: unknown;
}

interface ApiResponse {
  data: User;
  [key: string]: unknown;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),

    // add user
    addUser: builder.mutation<ApiResponse, Partial<User>>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              "getUsers",
              undefined,
              (draft: User[]) => {
                draft.push(createdUser);
              }
            )
          );
        } catch (error) {
          console.log("add user error", error);
        }
      },
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              "getUsers",
              undefined,
              (draft: User[]) => {
                const index = draft.findIndex((item) => item.id === args.id);
                draft[index] = updatedUser;
              }
            )
          );
        } catch (error) {
          console.log("update user error", error);
        }
      },
    }),

    // delete user
    removeUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              "getUsers",
              undefined,
              (draft: User[]) => {
                return draft.filter((item) => item.id !== id);
              }
            )
          );
        } catch (error) {
          console.log("remove user error", error);
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = userApi;
