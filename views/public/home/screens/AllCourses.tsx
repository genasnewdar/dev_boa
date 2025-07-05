'use client'

import { CourseCard } from "@/components/course"
import { ICourseData } from "@/types"
import { Button, Flex } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import { api } from '@/lib/api-client';
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';
import { Carousel } from "@mantine/carousel"

export const AllCourses = () => {
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

    return (
        <Flex direction={'column'} gap={30}>
            <Flex justify={'space-between'} align={'center'}>
                <div className="text-2xl font-semibold">Бүх хичээлүүд</div>
                <Button
                    onClick={() => router.push('/public/home/courses')}
                    variant="transparent"
                    className="!text-black"
                >
                    <div className="mr-2">Бүх хичээлүүд</div>
                    <IconArrowRight size={15} />
                </Button>
            </Flex>

            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-8">
                {freeCourse?.lessons?.map((data, index) => (
                    <CourseCard {...data} key={index} />
                ))}
            </div>

            <Carousel
                slideGap="md"
                controlSize={40}
                slideSize={'100%'}
                className="md:w-[calc(100vw-346px)] w-full md:hidden"
            >
                {freeCourse?.lessons?.map((data, index) => (
                    <Carousel.Slide key={index} className="p-3">
                        <CourseCard {...data} key={index} />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Flex>
    )
}