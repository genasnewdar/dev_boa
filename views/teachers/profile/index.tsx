'use client'

import {  IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { Avatar, Flex } from "@mantine/core"
import { useNotifications } from '../../../lib/notifications/useNotifications';
import { useUser } from "@auth0/nextjs-auth0"
import { NotificationDropdown } from '../../../components/notification';

export const TeacherProfile = () => {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const { user } = useUser();



    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Профайл", path: "/teacher/profile" },
                { label: "Үзсэн хичээлүүд" }
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
                <Flex justify={'space-between'} className="w-full">
                    <Flex align={'center'} gap={24}>
                        <div className="border border-primary-600 rounded-full">
                            <Avatar src={user?.picture} h={100} w={100} />
                        </div>

                        <Flex gap={24} direction={'column'}>
                            <div className="text-[36px] font-bold">
                                {user?.name}
                            </div>
                            <div className="text-lg font-medium max-w-[380px]">
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
                </Flex>
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