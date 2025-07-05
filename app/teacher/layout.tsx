import { TeacherLayout } from '@/lib';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '',
    description: '',
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <TeacherLayout> {children} </TeacherLayout>
    );
}