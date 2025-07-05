'use client'

import CollectiveCard from "@/components/course/CollectiveCard"
import { api } from '@/lib/api-client';
import { Carousel } from "@mantine/carousel"
import { Button, Flex } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ICourseCard } from "@/types"

export const CollectiveCourses = () => {
    const router = useRouter()
    const [freeCourse, setFreeCourses] = useState<ICourseCard[]>([])

    useEffect(() => {
        getFreeCourse()
    }, [])

    const getFreeCourse = async () => {
        try {
            const data = await api.get<ICourseCard[]>('/admin/course', { authType: 'token' });
            if (Array.isArray(data)) {
                setFreeCourses(data)
            } else {
                setFreeCourses([])
            }
        } catch (error) {
            console.log('free course error', error);
            setFreeCourses([])
        }
    }
    
    return (
        <Flex direction={'column'} gap={30}>
            <Flex justify={'space-between'} align={'center'}>
                <div className="text-lg font-normal md:text-xl md:font-semibold">Багц хичээлүүд</div>
                <Button
                    onClick={() => router.push('/user/home/collectives')}
                    variant="transparent" className="!text-black"
                >
                    <div className="mr-2">Багц хичээлүүд</div>
                    <IconArrowRight size={15} />
                </Button>
            </Flex>
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-8">
                {Array.isArray(freeCourse) && freeCourse.map((data, index) => (
                    <CollectiveCard {...data} key={index} />
                ))}
            </div>

            <Carousel
                slideGap="md"
                slideSize={'100%'}
                controlSize={40}
                className="md:w-[calc(100vw-346px)] w-full md:hidden"
            >
                {
                    freeCourse?.map((data, index) => {
                        return (
                            <Carousel.Slide key={index} className="p-3 ">
                                <CollectiveCard {...data} key={index} />
                            </Carousel.Slide>
                        )
                    })

                }
            </Carousel>
        </Flex>
    )
}