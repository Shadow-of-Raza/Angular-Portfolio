import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import { personalInfo } from '@/lib/content/profile';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title} Portfolio`,
  description: `${personalInfo.name} is a ${personalInfo.title} specializing in crafting software, web applications, and UI/UX design. Based in ${personalInfo.location.city}, India.`,
  keywords: ['Full Stack Developer', 'Java', 'Next.js', 'React', 'TypeScript', 'Portfolio', 'Mohd Ansar Bux'],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <SmoothScrollProvider>
          <div id="app-root">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
