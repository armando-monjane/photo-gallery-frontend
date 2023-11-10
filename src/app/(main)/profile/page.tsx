import Footer from '@/components/footer';
import Navbar from '@/app/(landing)/_components/navbar';
import { redirect } from 'next/navigation';
import { UserHeading } from './_components/user-heading';
import PhotoGallery from './_components/photo-gallery';
import { useTokenCookie } from '@/hooks/use-token-cookie';
import { Environment } from '@/environment';

/**
 * Retrieves user on the server side using the provided token.
 * @param {string} token - The user token.
 * Token must be passed as a parameter because this request is made on the server side, therefore, the token cannot be retrieved from redux.
 * @returns {Promise<User>} - A promise that resolves with the user data or
 */
async function getUserData(token: string) {
  const url = `${Environment.API_BASE_URL}/users/me`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

const ProfilePage = async () => {
  const token = useTokenCookie();

  if (!token) {
    return redirect('/login');
  }

  const user = await getUserData(token);

  if (!user) {
    return redirect('/logout');
  }

  return (
    <div className="min-h-full flex flex-col">
      <Navbar token={token} />
      <div className="flex flex-col gap-y-8 flex-1 p-5 pt-28">
        <UserHeading {...user} />
        <PhotoGallery photos={user.photos} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
