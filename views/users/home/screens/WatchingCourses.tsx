'use client'

import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Button, Flex, Progress } from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { useRef, useState } from "react";
import { EmblaCarouselType } from 'embla-carousel';

type Course = {
    stack: string;
    title: string;
    totalHour: string;
    watchedHour: string;
    percent: number;
};

export const WatchingCourses = () => {
    const emblaRef = useRef<EmblaCarouselType | null>(null);
    const [selectedSlide, setSelectedSlide] = useState(0);


    const scrollTo = (index: number) => {
        if (emblaRef.current) {
            emblaRef.current.scrollTo(index);
            setSelectedSlide(index);
        }
    };

    const useResponsiveSlideSize = () => {
        const isSm = useMediaQuery('(max-width: 767px)');
        if (isSm) return '100%';

        return '50%';
    }

    return (
        <Flex direction={'column'} className="w-full overflow-hidden" gap={30}>
            <Flex justify={'space-between'} align={'center'} className="w-full">
                <div className="text-lg font-normal md:text-xl xl:text-2xl md:font-semibold">Үзэж буй хичээлүүд</div>
                <Flex gap={16}>
                    <Button className="!p-1" variant="outline" radius={8}>
                        <IconChevronLeft
                            onClick={() => scrollTo(Math.max(selectedSlide - 1, 0))}
                            className="cursor-pointer"
                        />
                    </Button>
                    <Button className="!p-1" variant="outline" radius={8}>
                        <IconChevronRight
                            onClick={() => scrollTo(Math.min(selectedSlide + 1, courseDummy.length - 1))}
                            className="cursor-pointer"
                        />
                    </Button>
                </Flex>
            </Flex>


            <Carousel
                slideGap="md"
                slideSize={useResponsiveSlideSize()}
                withControls={false}
                className="md:w-[calc(100vw-346px)] w-full"
                getEmblaApi={(api) => {
                    emblaRef.current = api;
                }}
            >
                {
                    courseDummy.map((data, index) => {
                        return (
                            <Carousel.Slide key={index} className="p-3 ">
                                <ProcressCard {...data} />
                            </Carousel.Slide>
                        )
                    })

                }
            </Carousel>
        </Flex>
    )
}


const ProcressCard = (data: Course) => {
    const { stack, title, totalHour, watchedHour, percent } = data

    return (
        <Flex className="w-l p-4 border rounded-lg bg-white" direction={'column'} gap={24}>
            <Flex align={'center'} justify={'space-between'} gap={16}>
                <div className="text-sm py-2 px-4 bg-[#F4F7F5] rounded-lg">{stack}</div>
                <Image src='/vectors/course-progress.svg' className="w-[60px]" width={80} height={80} alt='logo' />
            </Flex>

            <div className="xl:text-2xl md:text-xl text-lg font-semibold md:max-w-[60%]">
                {title}
            </div>

            <Flex gap={24}>
                <div className="flex flex-col flex-1 gap-1">
                    <Progress value={percent} />
                    <Flex justify={'space-between'}>
                        <div className="flex gap-1">
                            <div>{watchedHour}</div>
                            <div>of</div>
                            <div>{totalHour}</div>
                        </div>
                        <div>
                            {percent}%
                        </div>
                    </Flex>
                </div>

                <Button className="!hidden md:block ">
                    <div className="mr-2">Үргэлжлүүлэх</div>
                    <IconArrowRight size={16} />
                </Button>
            </Flex>

        </Flex>
    )
}

const courseDummy: Course[] = [
    {
        stack: '1, Frontend development',
        title: 'Learn angular.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },
    {
        stack: 'Frontend development',
        title: '2, Test.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },
    {
        stack: 'Frontend development',
        title: '3, Learn angular.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },
    {
        stack: 'Frontend development',
        title: '4, Learn angular.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },
    {
        stack: 'Frontend development',
        title: '5, Learn angular.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },
    {
        stack: 'Frontend development',
        title: '6, Learn angular.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },
    {
        stack: 'Frontend development',
        title: '7, Learn angular.js from scratch to experts',
        totalHour: '4:30',
        watchedHour: '2:30',
        percent: 80
    },

]