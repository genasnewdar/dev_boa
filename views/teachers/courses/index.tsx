'use client'

import { ICourseCard, ICourseData } from "@/types"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { CourseCard } from "@/components/course"
import { api } from "@/lib/api-client"
import { Button } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react";
import { useUser } from "@auth0/nextjs-auth0";
import { Carousel } from '@mantine/carousel';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from '@mantine/core';
import CollectiveCard from '@/components/course/CollectiveCard';
import { useResponsiveSlideSize } from "@/utils/useResponsiveSlideSize"

export const TeacherCourses = () => {
    const [collectiveCourses, setCollectiveCourses] = useState<ICourseCard[] | null>(null)
    const [courseLessons, setCourseLessons] = useState<any[] | null>(null)

    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        getCollectiveCourses()
        getCourseLessons()
    }, [])

    const getCollectiveCourses = async () => {
        try {
            const data = await api.get<ICourseCard[]>('/api/course',{authType: "token"});
            setCollectiveCourses(data)
        } catch (error) {
            console.log('collective course error', error);
        }
    }

    const getCourseLessons = async () => {
        try {
            const data = await api.get<any[]>('/api/course/lessons/all',{authType: "token"});
            setCourseLessons(data)
        } catch (error) {
            console.log('course lessons error', error);
        }
    }

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Багш", path: "/teacher" },
                { label: "Хичээлүүд" }
            ]}
        >
            <div className="flex flex-col gap-8">
                <div className="flex flex-row items-center justify-between">
                    <div className="text-2xl">Хичээлүүд</div>
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            rightSection={<IconPlus />}
                            onClick={() => {
                                router.push('/teacher/courses/create-lesson')
                            }}
                            className="bg-primary-600 text-white"
                        >
                            Нэмэх
                        </Button>
                    </div>
                </div>
                <Carousel
                    slideSize={useResponsiveSlideSize()}
                    slideGap="md"
                    className="md:w-[calc(100vw-346px)] w-full"
                    withControls={false}
                >
                    {
                        courseLessons?.map((data, index) => {
                            return (
                                <Carousel.Slide key={index}>
                                    <CourseCard userType="TEACHER" {...data} isPublic={!user} />
                                </Carousel.Slide>
                            )
                        })
                    }
                    {
                        !courseLessons && (
                            <>
                                {
                                    Array(10).fill('').map((_, index) => {
                                        return (
                                            <Carousel.Slide key={index}>
                                                <Skeleton height={250} className='w-full' radius={30} mb="xl" />
                                            </Carousel.Slide>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </Carousel>

                <div className="flex flex-row items-center justify-between">
                    <div className="text-2xl">Багц хичээлүүд</div>
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            rightSection={<IconPlus />}
                            onClick={() => {
                                router.push('/teacher/courses/create-course')
                            }}
                            className="bg-primary-600 text-white"
                        >
                            Нэмэх
                        </Button>
                    </div>
                </div>
                <Carousel
                    slideSize={useResponsiveSlideSize()}
                    slideGap="md"
                    withControls={false}
                >
                    {
                        collectiveCourses?.map((data, index) => {
                            return (
                                <Carousel.Slide key={index}>
                                    <CollectiveCard {...data} isPublic={!user} userType="TEACHER" />
                                </Carousel.Slide>
                            )
                        })
                    }
                    {
                        !collectiveCourses && (
                            <>
                                {
                                    Array(10).fill('').map((_, index) => {
                                        return (
                                            <Carousel.Slide key={index}>
                                                <Skeleton height={170} className='w-full' radius={30} mb="xl" />
                                            </Carousel.Slide>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </Carousel>
            </div>
        </UserWrapper>
    )
}

