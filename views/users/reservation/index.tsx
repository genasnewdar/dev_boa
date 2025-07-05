'use client'

import { IconBell, IconCalendarTime, IconMail } from "@tabler/icons-react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { Button, Flex, Select, Textarea, TextInput } from "@mantine/core"
import { ICourseCard, ICourseData } from "@/types";
import { DateTimePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useForm } from "@mantine/form";
import { api } from '@/lib/api-client';
import { NotificationDropdown } from '../../../components/notification';
import { useNotifications } from '../../../lib/notifications/useNotifications';
import { useUser } from "@auth0/nextjs-auth0"

interface IFormValues {
    lessonId: string,
    title: string,
    description: string,
    startTime: Date | null,
    endTime: Date | null,
    location: string,
    participantId: string
}

export const UserReservation = () => {
    const [lessons, setLessons] = useState<any[]>([])
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const { user } = useUser();

    useEffect(() => {
        getAllLessons()
    }, [])

    const form = useForm<IFormValues>({
        initialValues: {
            lessonId: '',
            title: '',
            description: '',
            startTime: null,
            endTime: null,
            location: '',
            participantId: ''
        },
        validate: {
            lessonId: (value) => value ? null : 'Хичээл сонгоно уу',
            title: (value) => value ? null : 'Гарчиг оруулна уу',
            description: (value) => value ? null : 'Тайлбар оруулна уу',
            startTime: (value) => value ? null : 'Эхлэх цаг сонгоно уу',
            endTime: (value) => value ? null : 'Дуусах цаг сонгоно уу',
            location: (value) => value ? null : 'Газар сонгоно уу',
            participantId: (value) => value ? null : 'Оролцогчийн ID оруулна уу',
        },
    });

    const getAllLessons = async () => {
        try {
            const data = await api.get<any[]>('/api/course/lessons/all',{authType: "token"});
            setLessons(data)
        } catch (error) {
            console.log('lessons fetch error', error);
        }
    }

    const handleSubmit = async () => {
        form.onSubmit(async (val) => {
            try {
                await api.post('/api/course/meetings/post', {
                    organizerId: user?.sub,
                    participantId: val.participantId,
                    lessonId: Number(val.lessonId),
                    title: val.title,
                    description: val.description,
                    startTime: val.startTime?.toISOString(),
                    endTime: val.endTime?.toISOString(),
                    location: val.location
                }, { authType: 'token' })
                alert('Амжилттай илгээгдлээ')
            } catch (e) {
                alert('Алдаа гарлаа')
            }
        })()
    };

    return (
        <UserWrapper
            title="Захиалгат сургалт"
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
            <div className="w-full h-full flex gap-8 flex-col md:flex-row">
                <div className="md:flex-1 flex flex-col gap-6 items-start justify-start md:p-6">
                    <div className="text-2xl font-semibold">
                        Сургалт захиалах
                    </div>

                    <Select
                        searchable
                        className="w-full"
                        label="Хичээл сонгох"
                        placeholder="Хичээл сонгоно уу"
                        data={lessons.map(lesson => ({
                            value: lesson.id.toString(),
                            label: lesson.title
                        }))}
                        {...form.getInputProps('lessonId')}
                    />

                    <TextInput
                        label="Гарчиг"
                        placeholder="Гарчиг"
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        label="Тайлбар"
                        placeholder="Тайлбар"
                        {...form.getInputProps('description')}
                    />

                    <TextInput
                        label="Оролцогчийн ID"
                        placeholder="Оролцогчийн Auth0 ID"
                        {...form.getInputProps('participantId')}
                    />

                    <DateTimePicker
                        label="Эхлэх цаг"
                        className="w-full"
                        placeholder="Эхлэх цаг сонгоно уу"
                        {...form.getInputProps('startTime')}
                    />

                    <DateTimePicker
                        label="Дуусах цаг"
                        className="w-full"
                        placeholder="Дуусах цаг сонгоно уу"
                        {...form.getInputProps('endTime')}
                    />

                    <Select
                        searchable
                        className="w-full"
                        label="Газар сонгох"
                        placeholder="Газар сонгоно уу"
                        data={locationDummy}
                        {...form.getInputProps('location')}
                    />
                    <div className="hidden md:flex">
                        <Button onClick={handleSubmit}>
                            Хүсэлт илгээх
                        </Button>
                    </div>
                </div>
                <div className="md:hidden">
                    <Button onClick={handleSubmit} fullWidth>
                        Хүсэлт илгээх
                    </Button>
                </div>
            </div>
        </UserWrapper>
    )
}

const locationDummy = [
    {
        value: 'darkhan',
        label: 'Darkhan'
    },
    {
        value: 'ulaanbaatar',
        label: 'Ulaanbaatar'
    },
    {
        value: 'selenge',
        label: 'Selenge'
    },
    {
        value: 'uvs',
        label: 'Uvs'
    },
]