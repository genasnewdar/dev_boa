import { Metadata } from "next"
import { UserCourses } from "@/views/public/courses"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Courses | Master LMS",
  description: "Browse our courses"
}

export default function PublicCoursesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserCourses />
    </Suspense>
  )
}
