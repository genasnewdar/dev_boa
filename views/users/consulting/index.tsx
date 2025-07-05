'use client'

import { OneOnOneSection } from "./screens/OneOnOneSection"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { OnlineSection } from "./screens/OnlineSection"
import { Button, Flex } from "@mantine/core"
import { useState } from "react"
import { NotificationDropdown } from '../../../components/notification'
import { useNotifications } from '../../../lib/notifications/useNotifications'

type TabType = 'online' | 'one-on-one'

export const UserConsulting = () => {
    const [tabValue, setTabValue] = useState<TabType>('online')
    const { notifications, unreadCount, markAsRead } = useNotifications()

    const getScreen = () => {
        switch (tabValue) {
            case 'one-on-one':
                return <OneOnOneSection />
            case 'online':
                return <OnlineSection />
            default:
                return ''
        }
    }

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Зөвлөх үйлчилгээ", path: "/user/consulting" }
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
                        onClick={() => setTabValue('online')}
                        variant={tabValue === 'online' ? "outline" : "default"}
                        className={tabValue === 'online' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                    >
                        Онлайн зөвөлгөө
                    </Button>
                    <Button
                        radius={10}
                        onClick={() => setTabValue('one-on-one')}
                        variant={tabValue !== 'online' ? "outline" : "default"}
                        className={tabValue !== 'online' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                    >
                        Ганцаарчилсан уулзалт
                    </Button>
                </Flex>

                <div className="flex-1"> {getScreen()} </div>
            </div>
        </UserWrapper>
    )
}