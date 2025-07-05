'use client'

import { ILessonData } from "@/types"
import CardFlag from "./CardFlag"
import Image from "next/image"
import { useRouter } from "next/navigation"

const conver = 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const CourseCard = (data: ILessonData) => {
    const router = useRouter()
    // Destructure all possible fields from data
    const {
        title,
        userType,
        teacherName,
        id,
        isPublic,
        teacherImage,
        description,
        category,
        price,
        duration,
        videoUrl,
        course_id,
        rating,
        rating_count,
        templateImageUrl,
        created_at,
        updated_at,
        is_deleted
    } = data

    return (
        <div className="border h-full border-black/30 rounded-[30px] cursor-pointer overflow-hidden" onClick={() => {
            if (isPublic) {
                router.push(`/public/courses?id=${id}`)
            } else {
              userType==="TEACHER" ?    router.push(`/teacher/courses/create-lesson/${id}`):   router.push(`/user/courses?id=${id}`)
            }
        }}>
            <div className="h-[140px] relative bg-gray-100">
                <Image
                    src={templateImageUrl || '/vectors/hero.svg'}
                    className="w-full  object-cover"
                    fill
                    alt="cover"
                    style={{ objectFit: "cover" }}
                />
                <div className="absolute left-4 -bottom-8 flex items-center">
                    <Image
                        src={teacherImage || conver}
                        className="w-[60px] h-[60px] rounded-full border-4 border-white shadow"
                        width={60}
                        height={60}
                        alt="teacher"
                    />
                    <div className="ml-3 flex flex-col">
                        <span className="font-semibold text-base">{teacherName ?? 'Byambaa'}</span>
                        <span className="text-xs text-gray-400">{category}</span>
                    </div>
                </div>
                <div className="absolute top-4 right-4">
                    <CardFlag flag={`${category}`} />
                </div>
            </div>

            <div className="p-4 pt-12 flex flex-col gap-2">
                <div className="font-semibold text-lg truncate">{title}</div>
                <div className="text-[#8F8F8F] text-sm line-clamp-2">{description}</div>
                <div className="flex gap-4 mt-2 text-sm text-gray-700">
                    <span>Үнэ: <span className="font-medium">{price ?? 0}₮</span></span>
                    {duration && <span>Хугацаа: {duration}</span>}
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                    <span>Огноо: {created_at ? new Date(created_at).toLocaleDateString() : ''}</span>
                    {rating !== null && rating !== undefined && (
                        <span>Үнэлгээ: {rating} ({rating_count ?? 0})</span>
                    )}
                </div>
             
            </div>
        </div>
    )
}

export default CourseCard