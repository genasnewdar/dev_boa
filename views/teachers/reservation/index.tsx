'use client'

import { IconBell, IconCalendarTime, IconMail } from "@tabler/icons-react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { Button, Flex, Select } from "@mantine/core"
import { DateTimePicker } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { api } from '@/lib/api-client';
import { useEffect, useState } from 'react';
import { ICourseCard } from "@/types";

interface IFormValues {
    location: string,
    course: string,
    date: Date | null,
}

export const TeacherReservation = () => {
    const [freeCourse, setFreeCourses] = useState<ICourseCard[]>([])

    const form = useForm<IFormValues>({
        initialValues: {
            course: '',
            date: null,
            location: '',
        },
        validate: {
            course: (value) => value ? null : 'Хичээл сонгоно уу',
            date: (value) => {
                if (!value) return 'Цаг сонгоно уу';
                if (value <= new Date()) return 'Өнгөрсөн огноо сонгож болохгүй';
                return null;
            },
            location: (value) => value ? null : 'Газар сонгоно уу',
        },
    });

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

    const handleSubmit = async () => {
        form.onSubmit((val) => {
            console.log(val, 'submit');
        })()
    };

    const getCourseData = () => {
        
        
        return freeCourse.map(({ id, title }) => {
            return {
                value: id,
                label: title
            }
        })
    }

    const onSelectCourse = async (type: string) => {
        console.log('uranhcimeg', type);
        

    }

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Багш", path: "/teacher" },
                { label: "Захиалгат сургалт" }
            ]}
            headerIcons={
                <Flex gap={20} className="text-primary-600">
                    <IconBell className="cursor-pointer" />
                </Flex>
            }
        >
            <div className="w-full h-full flex gap-8">
                <div className="flex-1 flex flex-col gap-6 items-start justify-start p-6">
                    <div className="text-2xl font-semibold">
                        Цаг товлох
                    </div>

                    <Select
                        searchable
                        className="w-full"
                        label="Хичээлийн нэр"
                        placeholder="Хичээл сонгоно уу"
                        data={getCourseData()}
                        {...form.getInputProps('course')}
                        // onChange={onSelectCourse}
                    />

                    <DateTimePicker
                        label="Цаг сонгох"
                        leftSection={<IconCalendarTime size={18} />}
                        className="w-full"
                        placeholder="Цаг сонгоно уу"
                        {...form.getInputProps('date')}
                    />

                    <Select
                        searchable
                        className="w-full"
                        label="Газар сонгох"
                        placeholder="Газар сонгоно уу"
                        data={locationDummy}
                        {...form.getInputProps('location')}
                    />
                    <Button onClick={handleSubmit}>
                        Хүсэлт илгээх
                    </Button>
                </div>


                <div className="flex-1">
                    {/* {
                        freeCourse.map((course, index) => {
                            if (course.id !== form.values.course) { return null }

                            return (
                                <div
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: course.embedded }}
                                />
                            )
                        })
                    } */}
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