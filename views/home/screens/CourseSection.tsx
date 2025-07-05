'use client'

import { Carousel } from '@mantine/carousel';
import LayoutWrapper from "@/components/wrapper"
import { ICourseCard, ICourseData } from "@/types"
import { CourseCard } from '@/components/course';
import { api } from '@/lib/api-client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';
import CollectiveCard from '@/components/course/CollectiveCard';
import { useUser } from '@auth0/nextjs-auth0';
import { useResponsiveSlideSize } from '@/utils/useResponsiveSlideSize';

export const CourseSection = () => {
    const [collectiveCourses, setCollectiveCourses] = useState<any[] | null>(null)
    const [freeLessons, setFreeLessons] = useState<any[] | null>(null)
    const [topRatedLessons, setTopRatedLessons] = useState<any[] | null>(null)
    const { user } = useUser()

    useEffect(() => {
        getTopRatedCourses()
    }, [])

    const getTopRatedCourses = async () => {
        try {
            const data = await api.get<any>('/api/course/top-rated', { authType: 'token' });
            setTopRatedLessons(data.topRatedLessons || [])
            setFreeLessons(data.topRatedFreeLessons || [])
            setCollectiveCourses(data.topRatedCourses || [])
        } catch (error) {
            console.log('top rated courses error', error);
        }
    }

    return (
        <LayoutWrapper>
            <div className="pb-[100px] pt-[180px] flex flex-col gap-8">
                {/* Free Lessons */}
                <div className='text-common-tdark md:font-bold text-[24px] md:text-[32px] mt-4'>Үнэгүй хичээлүүд</div>
                <Carousel
                    slideGap="md"
                    slideSize={useResponsiveSlideSize()}
                    withControls={false}
                >
                    {
                        freeLessons?.map((data, index) => (
                            <Carousel.Slide key={index}>
                                <CourseCard {...data} isPublic={!user} />
                            </Carousel.Slide>
                        ))
                    }
                    {
                        !freeLessons && (
                            <>
                                {
                                    Array(10).fill('').map((_, index) => (
                                        <Carousel.Slide key={index}>
                                            <Skeleton height={250} className='w-full' radius={30} mb="xl" />
                                        </Carousel.Slide>
                                    ))
                                }
                            </>
                        )
                    }
                </Carousel>

                {/* Top Rated Lessons */}
                <div className='text-common-tdark md:font-bold text-[24px] md:text-[32px] mt-4'>Топ үнэлгээтэй хичээлүүд</div>
                <Carousel
                    slideGap="md"
                    slideSize={useResponsiveSlideSize()}
                    withControls={false}
                >
                    {
                        topRatedLessons?.map((data, index) => (
                            <Carousel.Slide key={index}>
                                <CourseCard {...data} isPublic={!user} />
                            </Carousel.Slide>
                        ))
                    }
                    {
                        !topRatedLessons && (
                            <>
                                {
                                    Array(10).fill('').map((_, index) => (
                                        <Carousel.Slide key={index}>
                                            <Skeleton height={250} className='w-full' radius={30} mb="xl" />
                                        </Carousel.Slide>
                                    ))
                                }
                            </>
                        )
                    }
                </Carousel>

                {/* Top Rated Courses */}
                <div className='text-common-tdark md:font-bold text-[24px] md:text-[32px] mt-4'>Топ үнэлгээтэй сургалтууд</div>
                <Carousel
                    slideSize={useResponsiveSlideSize()}
                    slideGap="md"
                    withControls={false}
                >
                    {
                        collectiveCourses?.map((data, index) => (
                            <Carousel.Slide key={index}>
                                <CollectiveCard {...data} isPublic={!user} />
                            </Carousel.Slide>
                        ))
                    }
                    {
                        !collectiveCourses && (
                            <>
                                {
                                    Array(10).fill('').map((_, index) => (
                                        <Carousel.Slide key={index}>
                                            <Skeleton height={170} className='w-full' radius={30} mb="xl" />
                                        </Carousel.Slide>
                                    ))
                                }
                            </>
                        )
                    }
                </Carousel>
            </div>
        </LayoutWrapper>
    )
}