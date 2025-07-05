'use client'

import UserWrapper from "@/components/wrapper/UserWrapper"
import { Flex } from "@mantine/core"
import { AllCourses } from "./screens/AllCourses"
import { CollectiveCourses } from "./screens/CollectiveCourses"

export const PublicHome = () => {
    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Хичээлүүд", path: "/public/home" }
            ]}
        >
            <div className="flex flex-col gap-10 w-full">
                {/* <WatchingCourses /> */}
                <CollectiveCourses />
                <AllCourses />
            </div>
        </UserWrapper>
    )
}

