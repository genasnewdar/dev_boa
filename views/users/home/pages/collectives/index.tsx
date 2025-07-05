'use client'


import UserWrapper from "@/components/wrapper/UserWrapper"
import { IconChevronLeft, } from "@tabler/icons-react"
import { Button, Flex } from "@mantine/core"
import { ICollectiveCard, ICourseCard } from "@/types"
import CollectiveCard from "@/components/course/CollectiveCard"
import { api } from '@/lib/api-client';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { NotificationDropdown } from '../../../../../components/notification';
import { useNotifications } from '../../../../../lib/notifications/useNotifications';


export const UserHomeCollective = () => {

    const router = useRouter()
    const [freeCourse, setFreeCourses] = useState<ICourseCard[]>([])
    const { notifications, unreadCount, markAsRead } = useNotifications();

    useEffect(() => {
        getFreeCourse()
    }, [])

    const getFreeCourse = async () => {
        try {
            const data = await api.get<ICourseCard[]>('/admin/course');
            setFreeCourses(data)
        } catch (error) {
            console.log('free course error', error);
        }
    }


    return (
        <UserWrapper
            title="Хичээлүүд"
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
            <Flex direction={'column'} gap={30} className="w-full">
                <Flex gap={16} align={'center'}>
                    <Button className="!p-1" variant="outline" radius={8}>
                        <IconChevronLeft
                            onClick={() => router.back()}
                        />
                    </Button>

                    <div className="md:text-2xl text-xl font-semibold">Багц хичээлүүд</div>
                </Flex>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-full gap-8">
                    {
                        freeCourse?.map((data, index) => {
                            return (<CollectiveCard {...data} key={index} />)
                        })
                    }
                </div>
            </Flex>
        </UserWrapper>
    )
}