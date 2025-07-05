'use client'

import { Flex, NumberFormatter } from "@mantine/core"
import { ICollectiveCard } from "@/types"
import Image from "next/image"
import dayjs from 'dayjs'
import { useRouter } from "next/navigation"


const CollectiveCard = (data: ICollectiveCard) => {
    const router = useRouter()
    const { title, userType, created_at, id, isPublic, description, price, templateImageUrl } = data

    return (
        <div className="border border-black/30 rounded-[20px] h-full cursor-pointer p-3 flex flex-col gap-4 w-full overflow-hidden"
            onClick={() => {
                if (isPublic) {
                    router.push(`/public/courses?id=${id}&type=collective`)
                } else {
                    userType === "TEACHER"? router.push(`/teacher/courses/${id}`) : router.push(`/user/courses?id=${id}&type=collective`)
                }
            }}
        >
            <Flex justify={'space-between'} align={'start'} flex={1}>
                <Image
                    src={templateImageUrl || '/vectors/course-progress.svg'}
                    className="w-[60px]"
                    width={80}
                    height={80}
                    alt='logo'
                />
                <div className="bg-primary-600/10 border border-primary-600 px-3 py-1 text-sm rounded-lg">
                    {dayjs(created_at).format('YYYY-MM-DD HH:mm')}
                </div>
            </Flex>

            <div className="text-xl font-medium">{title}</div>
            <div className="text-gray-600 text-sm">{description}</div>

            <Flex justify={'space-between'}>
                {/* You can show course_id or other info here if needed */}
                <div>Үнэ:</div>
                <NumberFormatter suffix="₮ " value={price ?? 0} thousandSeparator className="font-medium" />
            </Flex>
        </div>
    )
}

export default CollectiveCard