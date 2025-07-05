'use client'

import { WatchingCourses } from "./screens/WatchingCourses"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { NotificationDropdown } from '../../../components/notification';
import { useNotifications } from '../../../lib/notifications/useNotifications';
import { Flex } from "@mantine/core"
import { AllCourses } from "./screens/AllCourses"
import { CollectiveCourses } from "./screens/CollectiveCourses"

interface UserSession {
  user?: {
    email?: string;
    email_verified?: boolean;
    name?: string;
    nickname?: string;
    picture?: string;
    sub?: string;
    updated_at?: string;
    [key: string]: any;
  };
  idToken?: string;
  accessToken?: string;
  [key: string]: any;
}

interface UserHomeProps {
  userInfo: UserSession;
}

export const UserHome = ({ userInfo }: UserHomeProps) => {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    
    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Хичээлүүд", path: "/user/home" }
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
            <div className="flex flex-col gap-10 w-full">
                <WatchingCourses />
                <CollectiveCourses />
                <AllCourses />
            </div>
        </UserWrapper>
    )
}

