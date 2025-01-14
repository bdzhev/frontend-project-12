import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  keepUnusedDataFor: 600,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.query({
      query: (channelName) =>({
        method: 'POST',
        body: { name: channelName },
      })
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        method: 'DELETE',
        url: channelId,
      }),
    }),
    editChannel: builder.mutation({
      query: (channelId, newName) => ({
        method: 'PATCH',
        body: { name: newName },
        url: channelId,
      }),
    }),
  })
});

export const {
  useGetChannelsQuery,
  useAddChannelQuery,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;
