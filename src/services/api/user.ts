import { api } from './index';

/**
 * Defines an API for user endpoints.
 * @param api - The API object.
 * @returns An object containing the login and signup endpoints.
 */
export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.mutation({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useMeMutation } = authApi;

export const {
  endpoints: {},
} = authApi;
