'use client'

import { GeneralInfoSection } from "./screens/GeneralInfoSection"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { IconMail } from "@tabler/icons-react"
import { SafetySection } from "./screens/SafetySection"
import { Button, Flex } from "@mantine/core"
import { useState } from "react"
import { NotificationDropdown } from '../../../components/notification';
import { useNotifications } from '../../../lib/notifications/useNotifications';

type TabType = 'general-info' | 'safety'

export const UserSettings = () => {
    const [tabValue, setTabValue] = useState<TabType>('general-info')
    const { notifications, unreadCount, markAsRead } = useNotifications();

    const getScreen = () => {
        switch (tabValue) {
            case 'general-info':
                return <GeneralInfoSection />
            case 'safety':
                return <SafetySection />
            default:
                return ''
        }
    }

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Засвар", path: "/user/settings" }
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
            <div className="w-full h-full flex gap-8 flex-col">
                <Flex className="md:gap-[24px] gap-4">
                    <Button
                        radius={10}
                        onClick={() => setTabValue('general-info')}
                        variant={tabValue === 'general-info' ? "outline" : "default"}
                        className={tabValue === 'general-info' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                    >
                        Ерөнхий мэдээлэл
                    </Button>
                    <Button
                        radius={10}
                        onClick={() => setTabValue('safety')}
                        variant={tabValue !== 'general-info' ? "outline" : "default"}
                        className={tabValue !== 'general-info' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                    >
                        Аюулгүй байдал
                    </Button>
                </Flex>
                <div className="flex-1"> {getScreen()} </div>
            </div>
        </UserWrapper>
    )
}