"use client"

import {  FloatingIndicator, Loader, Overlay, Tabs } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useCallback, useRef, useState } from "react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import classes from './tab.module.css'
import GeneralInfo from "@/views/teachers/create/screens/GeneralInfo"
import { api } from "@/lib/api-client"
import { useUser } from "@auth0/nextjs-auth0"
import { notifications } from "@mantine/notifications"


interface LessonAttachment {
  title: string
  fileUrl: string
}

interface Lesson {
  title: string
  description: string
  price: number
  videoUrl: string
  attachments?: LessonAttachment[]
}

interface CourseForm {
  title: string
  description: string
  price: number
  teacherId: string
  templateImageUrl: string
  lessons: Lesson[]
}

export default function CreateCourse() {
  const { user } = useUser();
  const [value, setValue] = useState('1')
  const [loading, setLoading] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const setControlRef = useCallback((value: string) => (node: HTMLButtonElement | null) => {
    if (node) {
      controlsRefs.current[value] = node
    }
  }, [])

  const form = useForm<CourseForm>({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      teacherId: `${user?.sub}`,
      templateImageUrl: '',
      lessons: []
    },
    validate: {
      title: (value) => (!value ? 'Гарчиг оруулна уу' : null),
      description: (value) => (!value ? 'Тайлбар оруулна уу' : null),
      price: (value) => (!value ? 'Үнэ оруулна уу' : null),
    }
  })

  const handleSubmit = async (values: CourseForm) => {
    try {
      setLoading(true)
      const response:any = await api.post(`/api/course`, { ...values, teacherId: `${user?.sub}` }, { authType: 'token' })
      if (response && (response.status === 200 || response.status === 201)) {
        notifications.show({
          title: 'Амжилттай',
          message: 'Курс амжилттай үүслээ',
          color: 'green'
        })
      } else {
        notifications.show({
          title: 'Алдаа',
          message: response?.data?.message || 'Курс үүсгэхэд алдаа гарлаа',
          color: 'red'
        })
      }
    } catch (error: any) {
      notifications.show({
        title: 'Алдаа',
        message: error?.message || 'Курс үүсгэхэд алдаа гарлаа',
        color: 'red'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserWrapper title="Багш / Хичээл үүсгэх">
      {loading && (
        <Overlay blur={1} center>
          <Loader size="lg" />
        </Overlay>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-2 gap-10 w-full h-max">
        <div className="text-2xl col-span-2">Цуврал хичээл үүсгэх</div>
        
        <div className="col-span-2">
          <Tabs variant="none" value={value} onChange={(value) => setValue(value || '1')}>
            <Tabs.List ref={rootRef} className={classes.list}>
              <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                Ерөнхий мэдээлэл
              </Tabs.Tab>
             

              <FloatingIndicator
                target={value ? controlsRefs.current[value] : null}
                parent={rootRef.current}
                className={classes.indicator}
              />
            </Tabs.List>

            <Tabs.Panel value="1">
              <GeneralInfo form={form} />
            </Tabs.Panel>
            
          </Tabs>
        </div>

      </form>
    </UserWrapper>
  )
}