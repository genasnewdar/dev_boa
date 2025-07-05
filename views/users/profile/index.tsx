'use client'

import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { Avatar, Button, Flex } from "@mantine/core"
import { useState, useEffect } from "react"
import { CertificatesSection } from "./screens/CertificatesSection"
import { useMediaQuery } from "@mantine/hooks"
import { NotificationDropdown } from '../../../components/notification'
import { useNotifications } from '../../../lib/notifications/useNotifications'
import { useUser } from "@auth0/nextjs-auth0"
import { api } from "@/lib/api-client"
import { CourseSection } from "@/views/home/screens"

type TabType = 'courses' | 'certificates'

export const UserProfile = () => {
    const { notifications, unreadCount, markAsRead } = useNotifications()
    const { user } = useUser();

    const [tabValue, setTabValue] = useState<TabType>('courses')

    const getScreen = () => {
        switch (tabValue) {
            case 'certificates':
                return <CertificatesSection />
            case 'courses':
                return <CourseSection />
            default:
                return ''
        }
    }

    const useResponsiveButtonWidth = () => {
        const isSm = useMediaQuery('(max-width: 767px)');
        if (isSm) return true;

        return false;
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await api.get('/api/user',{authType: 'token'});
                console.log('User API data:', data)
            } catch (e) {
                console.log('User API error:', e)
            }
        }
        fetchUser()
    }, [])

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Профайл", path: "/user/profile" },
                { label: tabValue === 'certificates' ? "Гэрчилгээнүүд" : "Үзсэн хичээлүүд" }
            ]}
            headerIcons={
                <Flex gap={20} className="text-primary-600">
                    <NotificationDropdown
                        notifications={notifications}
                        unreadCount={unreadCount}
                        onNotificationClick={notification => markAsRead(notification.id)}
                        className="cursor-pointer"
                    />
                </Flex>
            }
        >
            <div className="w-full h-full flex gap-16 items-start flex-col overflow-hidden">
                <Flex justify={'space-between'} className="w-full flex-col xl:flex-row gap-10">
                    <Flex align={useResponsiveButtonWidth() ? 'start' : 'center'} gap={24}>
                        <div className="border border-primary-600 rounded-full">
                            <Avatar
                                src={user?.picture}
                                h={useResponsiveButtonWidth() ? 80 : 100}
                                w={useResponsiveButtonWidth() ? 80 : 100}
                            />
                        </div>

                        <Flex className="gap-4 md:gap-[24]" direction={'column'}>
                            <div className=" text-lg md:text-[36px] font-bold">
                                {user?.name}
                            </div>
                            <div className="text:xs md:text-lg font-medium max-w-[380px]">
                                Social media and Brand Designer based in Ulaanbaatar
                            </div>

                            <div className="flex gap-4">
                                {
                                    platforms.map((platform, index) => {
                                        return (
                                            <a href={platform.link} target="_blank" className="border rounded-lg p-2" key={index}>
                                                {platform.icon}
                                            </a>
                                        )
                                    })
                                }
                            </div>

                        </Flex>

                    </Flex>

                    <Flex gap={40}>
                        <Flex direction={'column'} gap={8}>
                            <div className="text-grey-500 md:text-lg">Үзсэн хичээл</div>
                            <div className="font-semibold text-xl md:text-2xl">29</div>
                        </Flex>
                        <Flex direction={'column'} gap={8}>
                            <div className="text-grey-500 md:text-lg">Үзэж буй</div>
                            <div className="font-semibold text-xl md:text-2xl">3</div>
                        </Flex>
                        <Flex direction={'column'} gap={8}>
                            <div className="text-grey-500 md:text-lg">Дуртай</div>
                            <div className="font-semibold text-xl md:text-2xl">7</div>
                        </Flex>
                    </Flex>

                </Flex>

                <div>
                    <Flex gap={24}>
                        <Button
                            radius={10}
                            onClick={() => setTabValue('courses')}
                            variant={tabValue === 'courses' ? "outline" : "default"}
                            className={tabValue === 'courses' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                        >
                            Үзсэн хичээлүүд
                        </Button>
                        <Button
                            radius={10}
                            onClick={() => setTabValue('certificates')}
                            variant={tabValue !== 'courses' ? "outline" : "default"}
                            className={tabValue !== 'courses' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                        >
                            Гэрчилгээнүүд
                        </Button>
                    </Flex>
                </div>

                {getScreen()}
            </div>
        </UserWrapper>
    )
}

const platforms = [
    {
        icon: <IconBrandFacebook size={18} />,
        link: 'https://www.facebook.com/RadioDeptLounge/'
    },
    {
        icon: <IconBrandTwitter size={18} />,
        link: 'https://www.facebook.com/RadioDeptLounge/'
    },
    {
        icon: <IconBrandInstagram size={18} />,
        link: 'https://www.facebook.com/RadioDeptLounge/'
    },
    {
        icon: <IconBrandLinkedin size={18} />,
        link: 'https://www.facebook.com/RadioDeptLounge/'
    }
]