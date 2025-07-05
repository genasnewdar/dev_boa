'use client'

import { AdminLayout } from "@/lib/layout/AdminLayout"

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>
} 