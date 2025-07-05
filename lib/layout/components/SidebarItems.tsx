import { usePathname, useRouter } from "next/navigation"
import { IconExclamationCircle, IconGift, IconQuestionMark, IconSettings } from "@tabler/icons-react"
import Image from "next/image";

export const SidebarItems = ({ closeDrawer }: { closeDrawer?: () => void }) => {
    const router = useRouter()
    const pathname = usePathname();
    const menuId = pathname ? pathname.split('/').pop() : '';


    const navigateRoutes = (path: string) => {
        router.push(path)

        if (closeDrawer) {
            closeDrawer()
        }
    }

    const menuItems = {
        benefits: {
            id: 'benefits',
            label: "Урамшуулал",
            icon: <IconGift className="size-4 md:size-6" />,
            onClick: () => { navigateRoutes('/profile/benefits') }
        },
        wallet: {
            id: 'wallet',
            label: "Хөнгөлөлтийн карт",
            icon: <Image src="/icons/ticket.svg" className="size-4 md:size-6" width={24} height={24} alt="ticket" />,
            onClick: () => { navigateRoutes('/profile/wallet') }
        },
        ebarimt: {
            id: 'ebarimt',
            label: "И-Баримт холбох",
            icon: <Image src="/icons/ebarimt.svg" className="size-4 md:size-6" width={24} height={24} alt="ebarimt" />,
            onClick: () => { navigateRoutes('/profile/ebarimt') }
        },
        faq: {
            id: 'faq',
            label: "Заавар",
            icon: <IconQuestionMark className="size-4 md:size-6" />,
            onClick: () => { navigateRoutes('/profile/faq') }
        },
        service: {
            id: 'service',
            label: "Үйлчилгээний нөхцөл",
            icon: <IconExclamationCircle className="size-4 md:size-6" />,
            onClick: () => { navigateRoutes('/profile/service') }
        },
        settings: {
            id: 'settings',
            label: "Тохиргоо",
            icon: <IconSettings className="size-4 md:size-6" />,
            onClick: () => { navigateRoutes('/profile/settings') }
        },
    }

    return (
        <div className=" bg-white rounded-lg w-full py-4 md:py-8">
            {
                Object.values(menuItems)?.map(({ id, label, icon, onClick }, index) => {
                    return (
                        <div key={id + index} onClick={onClick} className={`flex gap-2 items-center border-b border-[#F3F4F6] p-3 md:p-4 cursor-pointer ${menuId === id && 'border-l-4 border-l-green-500 border-b border-b-[#F3F4F6]'}`} >
                            <div className="border border-grey-200 p-2 rounded-lg">{icon}</div>
                            <div className="text-subtitle-300 hidden md:block font-semibold">{label}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

