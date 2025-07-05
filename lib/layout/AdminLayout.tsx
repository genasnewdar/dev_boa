'use client'

import { IconMenu2, IconUsers, IconLogout2, IconPhone, IconSettings } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, Drawer, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Image from "next/image"
import { JSX } from "react"
import clsx from 'clsx'

interface PageItem {
    name: string
    path: string
    icon: JSX.Element
}

const mainMenuItems: PageItem[] = [
    { name: 'Хэрэглэгчийн удирдлага', path: 'user-management', icon: <IconUsers /> },
]

const bottomMenuItems: PageItem[] = [
    { name: 'Холбоо барих', path: 'contact', icon: <IconPhone /> },
    { name: 'Системээс гарах', path: 'logout', icon: <IconLogout2 /> },
]

const adminInfo = {
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter()
    const routerName = usePathname()
    const pathName = routerName?.split('/')[2] ?? ''

    return (
        <Flex className="h-screen flex-col md:flex-row">
            <div className="md:hidden flex justify-between items-center p-4 gap-2 bg-common-grey">
                <div className="w-[78px]"> </div>
                <Image src='/images/logo.png' className="w-[80px]" width={80} height={80} alt='logo' />
                <Flex align={'center'} gap={16}>
                    <Avatar src={adminInfo.avatar} />
                    <IconMenu2 onClick={open} />
                </Flex>
            </div>
            <div className="bg-white py-10 px-6 min-w-[280px] md:flex flex-col justify-between hidden">
                <div className="flex flex-col gap-8">
                    <Flex className="w-full" justify={'center'} onClick={() => router.push('/')}>
                        <Image src='/images/logo.png' className="w-[80px] cursor-pointer" width={80} height={80} alt='logo' />
                    </Flex>

                    <div
                        onClick={() => router.push(`/admin/profile`)}
                        className={clsx(
                            "flex gap-4 items-center border py-2 px-4 rounded-[10px] cursor-pointer",
                            'profile' === pathName && "bg-primary-600/10 border border-primary-600"
                        )}
                    >
                        <Avatar src={adminInfo.avatar} />
                        <div>{adminInfo.name}</div>
                    </div>

                    <Flex direction={'column'} gap={20}>
                        {mainMenuItems.map((page, index) => (
                            <SidebarItem key={index} page={page} activePath={pathName} close={close} />
                        ))}
                    </Flex>
                </div>

                <Flex direction={'column'} gap={20} className="mt-auto">
                    {bottomMenuItems.map((page, index) => (
                        <SidebarItem key={index} page={page} activePath={pathName} close={close} />
                    ))}
                </Flex>
            </div>

            <Drawer opened={opened} onClose={close} size="100%">
                <Flex direction={'column'} gap={20}>
                    {mainMenuItems.map((page, index) => (
                        <SidebarItem key={index} page={page} activePath={pathName} close={close} />
                    ))}
                    <div className="mt-auto">
                        {bottomMenuItems.map((page, index) => (
                            <SidebarItem key={index} page={page} activePath={pathName} close={close} />
                        ))}
                    </div>
                </Flex>
            </Drawer>

            <div className="flex-1 overflow-auto bg-common-grey">
                {children}
            </div>
        </Flex>
    )
}

const SidebarItem = ({ page, activePath, close }: { page: PageItem, activePath: string, close: () => void }) => {
    const router = useRouter()

    const onClickSidebarItem = () => {
        switch (page.path) {
            case 'logout':
                router.push('/auth/logout')
                break;
            case 'contact':
                break;
            default:
                router.push(`/admin/${page.path}`)
                close()
                break;
        }
    }

    return (
        <div
            onClick={onClickSidebarItem}
            className={clsx(
                "flex items-center gap-4 py-2 px-4 rounded-[10px] cursor-pointer",
                page.path === activePath && "bg-primary-600/10"
            )}
        >
            <div className={clsx(page.path === activePath && "text-primary-600")}>
                {page.icon}
            </div>
            <div className="font-medium">{page.name}</div>
        </div>
    )
} 