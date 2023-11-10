import { cookies } from 'next/headers';
import { USER_TOKEN_COOKIE_NAME } from '@/redux/features/auth/auth-slice';

export const useTokenCookie = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get(USER_TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  if (token) {
    return token;
  }

  return null;
};
