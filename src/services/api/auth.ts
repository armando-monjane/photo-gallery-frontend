import { api } from './index';

/**
 * Defines an API for authentication.
 * @param api - The API object.
 * @returns An object containing the login and signup endpoints.
 */
export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {},
    }),
    signup: build.mutation({
      query: (formData: FormData) => ({
        url: '/register',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      extraOptions: {},
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

export const {
  endpoints: { login },
} = authApi;
