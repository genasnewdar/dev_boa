import PublicLayout from '@/lib/layout/PublicLayout'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '',
    description: '',
};

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PublicLayout>{children}</PublicLayout>
}