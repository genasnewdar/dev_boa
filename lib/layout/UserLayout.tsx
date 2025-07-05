'use client'

import { IconBrandFacebook, IconBrandInstagram, IconCertificate, IconClockHour3, IconHelpCircle, IconHome, IconLogout2, IconMenu2, IconPhone, IconSchool, IconSettings } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, Drawer, Flex, HoverCard } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useUser } from "@auth0/nextjs-auth0"
import Image from "next/image"
import { JSX } from "react"
import clsx from 'clsx'


interface PageItem {
	name: string
	path: string
	icon: JSX.Element
}

const pageList: PageItem[] = [
	{ name: 'Нүүр хуудас', path: 'home', icon: <IconHome /> },
	{ name: 'Хичээлүүд', path: 'courses', icon: <IconSchool /> },
	{ name: 'Гэрчилгээнүүд', path: 'certificates', icon: <IconCertificate /> },
	{ name: 'Захиалгат сургалт', path: 'reservation', icon: <IconClockHour3 /> },
	{ name: 'Зөвлөх үйлчилгээ', path: 'consulting', icon: <IconHelpCircle /> },
]

export function UserLayout({ children }: { children: React.ReactNode }) {

	const [opened, { open, close }] = useDisclosure(false);
	const { user } = useUser();

	const router = useRouter()
	const routerName = usePathname()
	const pathName = routerName?.split('/')[2] ?? ''


	return (
		<Flex className="h-screen flex-col md:flex-row">
			<div className="md:hidden flex justify-between items-center p-4 gap-2 bg-common-grey">
				<div className="w-[78px]"> </div>
				<Image src='/images/logo.png' className="w-[80px]" width={80} height={80} alt='logo' />
				<Flex align={'center'} gap={16}>
					<Avatar onClick={()=> router.push('/user/profile')}/>
					<IconMenu2 onClick={open} />
				</Flex>
			</div>
			<div className="bg-white py-10 px-6 min-w-[280px] md:flex flex-col gap-8 hidden">
				<Flex className="w-full" justify={'center'} onClick={() => router.push('/')}>
					<Image src='/images/logo.png' className="w-[80px] cursor-pointer" width={80} height={80} alt='logo' />
				</Flex>

				<div
					onClick={() => router.push(`/user/profile`)}
					className={clsx(
						"flex gap-4 items-center border py-2 px-4 rounded-[10px] cursor-pointer border-[#D6DBD8]",
						'profile' === pathName && "bg-primary-600/10 border border-primary-600"
					)}
				>
					<Avatar src={user?.picture} />
					<div>{user?.name}</div>
				</div>

				<Flex direction={'column'} gap={20}>
					{pageList.map((page, index) => (
						<SidebarItem key={index} page={page} activePath={pathName} close={close} />
					))}
				</Flex>

				<Flex direction={'column'} gap={20} flex={1} justify={'end'}>
					<SidebarItem page={{ name: 'Засвар', path: 'settings', icon: <IconSettings /> }} activePath={pathName} close={close} />
					<HoverCard width={280} shadow="lg" position={'top-end'} arrowOffset={30}>
						<HoverCard.Target>
							<div className={clsx("flex items-center gap-4 py-2 px-4 rounded-[10px] cursor-pointer",)} >
								<div>
									<IconPhone />
								</div>
								<div className="font-medium">Холбоо барих</div>
							</div>
						</HoverCard.Target>
						<HoverCard.Dropdown>
							<HoverCardItems />
						</HoverCard.Dropdown>
					</HoverCard>
					<SidebarItem page={{ name: 'Системээс гарах', path: 'logout', icon: <IconLogout2 /> }} activePath={pathName} close={close} />
				</Flex>
			</div>

			<div className="flex-1 bg-common-grey">
				{children}
			</div>

			<Drawer opened={opened} onClose={close}>
				<DrawerContent pathName={pathName} close={close} />
			</Drawer>

		</Flex>
	)
}

const DrawerContent = ({ pathName, close }: { pathName: string, close: () => void }) => {
	return (
		<div className="flex flex-col gap-[100px]">
			<Flex direction={'column'} gap={20}>
				{pageList.map((page, index) => (
					<SidebarItem key={index} page={page} activePath={pathName} close={close} />
				))}
			</Flex>

			<Flex direction={'column'} gap={20} flex={1} justify={'end'}>
				<SidebarItem page={{ name: 'Засвар', path: 'settings', icon: <IconSettings /> }} activePath={pathName} close={close} />
				<HoverCard width={280} shadow="lg" position={'top-end'} arrowOffset={30}>
					<HoverCard.Target>
						<div className={clsx("flex items-center gap-4 py-2 px-4 rounded-[10px] cursor-pointer",)} >
							<div>
								<IconPhone />
							</div>
							<div className="font-medium">Холбоо барих</div>
						</div>
					</HoverCard.Target>
					<HoverCard.Dropdown>
						<HoverCardItems />
					</HoverCard.Dropdown>
				</HoverCard>
				<SidebarItem page={{ name: 'Системээс гарах', path: 'logout', icon: <IconLogout2 /> }} activePath={pathName} close={close} />
			</Flex>
		</div>
	)
}

const HoverCardItems = () => {

	return (
		<Flex direction={'column'} gap={16}>
			<Flex gap={16}>
				<a href="https://www.facebook.com/projectmasteroyunka" target="_blank" ><IconBrandFacebook size={28} /></a>
				<a href="https://www.instagram.com/oyunka_project_master/" target="_blank"><IconBrandInstagram size={28} /></a>
			</Flex>

			<Flex direction={'column'}>
				<Flex gap={8}>
					<div className="font-bold">Утас: </div>
					<div className="font-bold text-grey-300">99099289</div>
				</Flex>

				<Flex gap={8}>
					<div className="font-bold">Хаяг: </div>
					<div className="font-bold text-grey-300">Darkhan-Uul aimag, Darkhan, Mongolia</div>
				</Flex>

				<Flex gap={8}>
					<div className="font-bold">Gmail: </div>
					<div className="font-bold text-grey-300">master@gmail.com</div>
				</Flex>
			</Flex>
		</Flex>
	)
}

const SidebarItem = ({ page, activePath, close }: { page: PageItem, activePath: string, close: () => void }) => {
	const router = useRouter()

	const onClickSidebarItem = () => {
		switch (page.path) {
			case 'logout':
				router.push('/auth/logout')
			case 'contact':
				break;
			default:
				router.push(`/user/${page.path}`)
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
			<div className=" font-medium">{page.name}</div>
		</div>
	)
}