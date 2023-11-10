import { Heading } from './_components/heading';
import Footer from '@/components/footer';
import Navbar from './_components/navbar';
import { useTokenCookie } from '@/hooks/use-token-cookie';

const LandingPage = () => {
  const token = useTokenCookie();

  return (
    <div className="min-h-full flex flex-col">
      <Navbar token={token} />
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading token={token} />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
