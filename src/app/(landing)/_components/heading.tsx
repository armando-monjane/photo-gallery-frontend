import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeadingProps {
  token: string | null;
}

export const Heading: React.FC<HeadingProps> = ({ token }) => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="sm:text-5xl font-bold">
        Your photos, your memories. Welcome to <br />
        <span className="underline">Photo Library</span>
      </h1>
      <Button>
        <Link className="flex flex-row" href={token ? '/profile' : '/login'}>
          {token ? 'Go to Gallery' : 'Sign in'}
          <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};
