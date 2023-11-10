import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { USER_TOKEN_COOKIE_NAME } from '@/redux/features/auth/auth-slice';

/**
 * Route Handler (https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
 * Deletes the user token cookie and redirects to the login page with a query parameter indicating that the user has just logged out.
 * @returns A redirect to the login page.
 */
export async function GET() {
  cookies().delete(USER_TOKEN_COOKIE_NAME);

  return redirect('/login?afterLogout=1');
}
