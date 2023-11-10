import { Slice, createSlice } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

import { authApi } from '@/services/api/auth';

export const USER_TOKEN_COOKIE_NAME = 'userToken';

type AuthState = {
  isAuthenticated: boolean;
  email: string;
  userId: number;
  isLoading: boolean;
  accessToken: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  email: '',
  userId: 0,
  isLoading: false,
  accessToken: '',
};

const setTokenCookie = (payload: { accessToken: string }) => {
  const { accessToken } = payload;

  const decode: any = jwt.decode(accessToken);

  // set cookie expire based on jwt token expire date
  const expirationDate = new Date(decode.exp * 1000);
  const cookies = new Cookies();
  cookies.set(USER_TOKEN_COOKIE_NAME, accessToken, {
    expires: expirationDate,
    path: '/',
    secure: true,
    sameSite: 'none',
  });
};

const handleLoginFullfilled = (state: AuthState, action: any) => {
  setTokenCookie(action.payload);

  state.isLoading = false;
  state.isAuthenticated = true;
  state.email = action.payload.email;
  state.userId = action.payload.userId;
};

const clearTokenCookies = () => {
  const cookies = new Cookies();
  cookies.remove(USER_TOKEN_COOKIE_NAME);
};

/**
 * Redux slice for authentication state management.
 * @name auth
 * @type {Slice}
 */
export const auth: Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      clearTokenCookies();
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // login
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        handleLoginFullfilled(state, action);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.email = '';
        state.userId = 0;
      });

    // signup
    builder
      .addMatcher(authApi.endpoints.signup.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        handleLoginFullfilled(state, action);
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.email = '';
        state.userId = 0;
      });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
