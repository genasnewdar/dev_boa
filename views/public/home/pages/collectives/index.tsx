'use client'

import UserWrapper from "@/components/wrapper/UserWrapper"
import { IconChevronLeft } from "@tabler/icons-react"
import { Button, Flex } from "@mantine/core"
import { ICourseCard } from "@/types"
import CollectiveCard from "@/components/course/CollectiveCard"
import { api } from '@/lib/api-client';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PublicHomeCollective = () => {
    const router = useRouter()
    const [freeCourse, setFreeCourses] = useState<ICourseCard[]>([])

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
            <Flex direction={'column'} gap={30} className="w-full">
                <Flex gap={16} align={'center'}>
                    <Button
                        className="!p-1"
                        variant="outline"
                        radius={8}
                        onClick={handleBack}
                    >
                        <IconChevronLeft size={18} />
                    </Button>

                    <div className="md:text-2xl text-xl font-semibold">Багц хичээлүүд</div>
                </Flex>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-full gap-8">
                    {freeCourse.map((data, index) => (
                        <CollectiveCard {...data} key={index} />
                    ))}
                </div>
            </Flex>
        </UserWrapper>
    )
}