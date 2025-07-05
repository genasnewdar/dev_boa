'use client'

import UserWrapper from "@/components/wrapper/UserWrapper"
import { IconChevronLeft } from "@tabler/icons-react"
import { Button, Flex } from "@mantine/core"
import { ICourseCard, ICourseData } from "@/types"
import { CourseCard } from "@/components/course"
import { api } from '@/lib/api-client';
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';

export const PublicHomeCourses = () => {
    const router = useRouter()
    const [freeCourse, setFreeCourses] = useState<ICourseData | null>(null)

    useEffect(() => {
        getFreeCourse()
    }, [])

    const getFreeCourse = async () => {
        try {
            const data = await api.get<ICourseData>('/admin/course/1');
            setFreeCourses(data)
        } catch (error) {
            console.log('free course error', error);
        }
    }

    const handleBack = () => {
        try {
            router.back()
        } catch (error) {
            // Fallback to home page if router.back() fails
            router.push('/public/home')
        }
    }

    return (
        <UserWrapper
            title="Хичээлүүд"
        >
            <Flex direction={'column'} gap={30}>
                <Flex gap={16} align={'center'}>
                    <Button 
                        className="!p-1" 
                        variant="outline" 
                        radius={8}
                        onClick={handleBack}
                    >
                        <IconChevronLeft size={18} />
                    </Button>

                    <div className="md:text-2xl text-xl font-semibold">Бүх хичээлүүд</div>
                </Flex>

                <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-8">
                    {freeCourse?.lessons?.map((data, index) => (
                        <CourseCard {...data} key={index} />
                    ))}
                </div>
            </Flex>
        </UserWrapper>
    )
}