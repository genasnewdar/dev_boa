import { Footer } from '@/lib';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Express Login',
    description: 'Олон улсын жишигт нийцсэн, технологи дээр суурилсан, шинэ үеийн тээврийн үйлчилгээний цогц шийдэл бүтээгч үндэсний компани',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
