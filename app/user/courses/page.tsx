'use client';

import { UserCourses } from "@/views/users/courses";
import { Suspense } from "react";

export default function UserCoursesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserCourses />
    </Suspense>
  );
}
