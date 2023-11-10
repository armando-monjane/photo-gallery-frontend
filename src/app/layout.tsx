import { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ReduxProvider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: `Photo Library Web App`,
  description: `Awesome web app developed using using Next.js and TypeScript`,
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="photo-library-theme"
          >
            <Toaster position="bottom-center" richColors />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
