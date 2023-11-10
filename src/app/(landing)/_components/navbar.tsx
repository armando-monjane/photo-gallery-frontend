import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  token: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ token }) => {
  return (
    <div className="z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 border-b shadow-sm">
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!token && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </>
        )}
        {token && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/logout">Logout</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
