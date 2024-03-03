"use client";
import { apiSlice } from "../apiSlice";
export const todoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (props) => {
        return {
          url: `todo`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        if (res.data) return res.data;
        return res;
      },
      providesTags: ["todo"],
    }),
    updateTodos: builder.mutation({
      query: (props) => {
        return {
          url: `todo`,
          method: "PUT",
          body: props?.payload,
        };
      },
      invalidatesTags: ["todo"],
    }),

    CreateTodo: builder.mutation({
      query: (props) => {
        return {
          url: `todo`,
          method: "POST",
          body: props?.payload,
        };
      },
      invalidatesTags: ["todo"],
    }),
    getColumn: builder.query({
      query: (props) => {
        return {
          url: `column`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        if (res.data) return res.data;
        return res;
      },
      providesTags: ["todo"],
    }),
    CreateColumn: builder.mutation({
      query: (props) => {
        return {
          url: `column`,
          method: "POST",
          body: props?.payload,
        };
      },
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (props) => {
        return {
          url: `todo`,
          method: "DELETE",
          body: props?.payload,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useUpdateTodosMutation,
  useCreateTodoMutation,
  useGetColumnQuery,
  useDeleteTodoMutation,
  useCreateColumnMutation,
} = todoSlice;
