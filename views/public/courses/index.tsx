'use client'

import { IconArrowLeft, IconCarambola, IconChevronDown, IconCircleCaretRight, IconClockHour5, IconMenu2 } from "@tabler/icons-react";
import { SingleCourseScreen } from "./screens/SingleCourseScreen";
import { api } from '@/lib/api-client';
import { Button, Drawer, Flex } from "@mantine/core";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import UserWrapper from "@/components/wrapper/UserWrapper";
import { CollectiveScreen } from "./screens/CollectiveScreen";
import { ICourseData, ICourseLesson } from "@/types";
import clsx from 'clsx'
import { useDisclosure } from "@mantine/hooks";
import { useNotifications } from '../../../lib/notifications/useNotifications';

export const UserCourses = () => {
    const router = useRouter()
    const { notifications, unreadCount, markAsRead } = useNotifications();

    const searchParams = useSearchParams();
    const shortId = searchParams?.get("id");
    const courseType = searchParams?.get("type");

    const [opened, { open, close }] = useDisclosure(false);
    const [collectiveCourse, setCollectiveCourses] = useState<ICourseData | null>(null)
    const [course, setCourses] = useState<ICourseLesson | null>(null)

    useEffect(() => {
        if (courseType === 'collective') {
            getCollectiveCourse()
        } else {
            getSignleCourse()
        }
    }, [])

    const getCollectiveCourse = async () => {
        try {
            const data = await api.get<ICourseData>(`/admin/course/${shortId ?? '1'}`);
            setCollectiveCourses(data)
        } catch (error) {
            console.log('free course error', error);
        }
    }

    const getSignleCourse = async () => {
        try {
            const data = await api.get<ICourseLesson>(`/admin/course/lessons/${shortId ?? '1'}`);
            setCourses(data)
        } catch (error) {
            console.log('free course error', error);
        }
    }

    const getScreen = () => {
        switch (courseType) {
            case 'collective':
                return <CollectiveScreen course={collectiveCourse} />
            default:
                return <SingleCourseScreen course={course} />;
        }
    }

    const checkIfCollective = () => {
        switch (courseType) {
            case 'collective':
                return true
            default:
                return false
        }
    }

    return (
        <UserWrapper
            title="Хичээлүүд / Frontend development "
        >
            <div className="w-full flex flex-col gap-8">
                <Flex align={'center'} gap={16}>
                    <Flex direction={'column'} gap={10} className="w-full">
                        <Flex gap={8} align={'center'}>
                            <div onClick={() => router.back()} className="border-primary-600 p-2 text-primary-600 border-[1.5px] rounded-lg cursor-pointer hidden md:flex">
                                <IconArrowLeft size={18} />
                            </div>

                            <div className="font-semibold text-xl md:text-2xl flex flex-1">
                                {
                                    courseType === 'collective' ? collectiveCourse?.title : course?.title
                                }
                            </div>
                            {
                                checkIfCollective() && (
                                    <div className="md:hidden">
                                        <Button onClick={open}>
                                            <IconMenu2 className="mr-2" size={18} />
                                            <div>Бүлгүүд</div>
                                        </Button>
                                    </div>
                                )
                            }
                        </Flex>
                        <Flex gap={16}>
                            <div className="flex gap-2 text-sm">
                                <IconCircleCaretRight color="#E33839" size={20} />
                                39 lessons
                            </div>
                            <div className="flex gap-2 text-sm">
                                <IconClockHour5 color="#E33839" size={20} />
                                4h 30min
                            </div>
                            <div className="flex gap-2 text-sm">
                                <IconCarambola color="#E33839" size={20} />
                                4.5 (52 review)
                            </div>
                        </Flex>
                    </Flex>

                    <div
                        className={clsx(
                            'hidden md:flex',
                            'gap-4 flex-1 items-center justify-end'
                        )}
                    >
                        <Button variant="default" className="!border-none !bg-transparent">Хуваалцах</Button>
                        <Button>Суралцах</Button>
                    </div>
                </Flex>

                {getScreen()}

                <Flex gap={24}>
                    <Button
                        radius={10}
                        variant={'outline'}
                        className={'!bg-primary-600/10'}
                    >
                        Ерөнхий мэдээлэл
                    </Button>
                </Flex>

                <div className="bg-white p-4 rounded-lg border border-black/30 flex flex-col gap-8">
                    <div className="text-[22px]"> Хичээлийн тухай </div>

                    <div>
                        {courseType === 'collective' ? collectiveCourse?.description : course?.description}
                    </div>
                </div>
            </div>

            <Drawer opened={opened} onClose={close}>
                <DrawerContent course={collectiveCourse}/>

            </Drawer>
        </UserWrapper>
    )
}

const DrawerContent = ({course}: {course: ICourseData | null}) => {
    const [courseIndex, setCourseIndex] = useState<number>(0)
    
    return (
        <div>
            {
                course?.lessons.map(({ title }, index) => {
                    return (
                        <div
                            className={`border-b p-4 border-black/30 cursor-pointer flex items-center gap-4 ${courseIndex === index && 'bg-primary-600/10'}`}
                            onClick={() => setCourseIndex(index)}
                            key={index}
                        >
                            <h3>{`${(index + 1).toString().padStart(2, '0')}`}: {title}</h3>
                            <div className="flex-1 flex justify-end">
                                <div className="border border-primary-600 text-primary-600 rounded-[6px] p-1">
                                    <IconChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}