import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import addSocketListener from './socketHelper';

const socket = io();

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
      onCacheEntryAdded: async (
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) => {
        addSocketListener(
          socket,
          'newChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
        addSocketListener(
          socket,
          'removeChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
        addSocketListener(
          socket,
          'renameChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
      },
    }),
    addChannel: builder.mutation({
      query: (newChannelName) => ({
        url: 'channels',
        method: 'POST',
        body: { name: newChannelName },
      }),
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        method: 'DELETE',
        url: `/channels/${channelId}`,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        method: 'PATCH',
        body: { name },
        url: `/channels/${id}`,
      }),
    }),
    getMessages: builder.query({
      query: () => 'messages',
      onCacheEntryAdded: async (
        args,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        },
      ) => {
        addSocketListener(
          socket,
          'newMessage',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
      },
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
  useAddMessageMutation,
  useGetMessagesQuery,
} = chatApi;
