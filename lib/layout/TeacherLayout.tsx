'use client'

import { IconClockHour3, IconHelpCircle, IconLayoutDashboard, IconLogout2, IconPhone, IconSchool, IconSettings } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, Flex } from "@mantine/core"
import Image from "next/image"
import clsx from 'clsx'
import { JSX } from "react"
import { useUser } from "@auth0/nextjs-auth0"

interface PageItem {
	name: string
	path: string
	icon: JSX.Element
}

const pageList: PageItem[] = [
	{ name: 'Хяналтын самбар', path: 'dashboard', icon: <IconLayoutDashboard /> },
	{ name: 'Хичээлүүд', path: 'courses', icon: <IconSchool /> },
	{ name: 'Захиалгат сургалт', path: 'reservation', icon: <IconClockHour3 /> },
	{ name: 'Зөвлөх үйлчилгээ', path: 'consulting', icon: <IconHelpCircle /> },
]

export function TeacherLayout({ children }: { children: React.ReactNode }) {

	const router = useRouter()
	const routerName = usePathname()
	const pathName = routerName?.split('/')[2] ?? ''
	const { user } = useUser();

	return (
		<Flex className="min-h-screen bg-green-100">
			<div className="bg-white py-10 px-6 min-w-[280px] flex flex-col gap-8">
				<Flex className="w-full" justify={'center'}>
					<Image src='/images/logo.png' className="w-[80px]" width={80} height={80} alt='logo' />
				</Flex>

				<div
					onClick={() => router.push(`/teacher/profile`)}
					className={clsx(
						"flex gap-4 items-center border py-2 px-4 rounded-[10px] cursor-pointer",
						'profile' === pathName && "bg-primary-600/10 border border-primary-600"
					)}
				>
					<Avatar src={user?.picture} />
					<div>{user?.name}</div>
				</div>

				<Flex direction={'column'} gap={20}>
					{pageList.map((page, index) => (
						<SidebarItem key={index} page={page} activePath={pathName} />
					))}
				</Flex>

				<Flex direction={'column'} gap={20} flex={1} justify={'end'}>
					<SidebarItem page={{ name: 'Засвар', path: 'settings', icon: <IconSettings /> }} activePath={pathName} />
					<SidebarItem page={{ name: 'Холбоо барих', path: 'contact', icon: <IconPhone /> }} activePath={pathName} />
					<SidebarItem page={{ name: 'Системээс гарах', path: 'logout', icon: <IconLogout2 /> }} activePath={pathName} />
				</Flex>
			</div>

			<div className="flex-1 bg-common-grey">
				{children}
			</div>
		</Flex>
	)
}

const SidebarItem = ({ page, activePath }: { page: PageItem, activePath: string }) => {
	const router = useRouter()


	const onClickSidebarItem = () => {
		switch (page.path) {
			case 'logout':
				router.push('/auth/logout')
			case 'contact':
				break;
			default:
				router.push(`/teacher/${page.path}`)
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
			<div className=" font-medium">{page.name}</div>
		</div>
	)
}