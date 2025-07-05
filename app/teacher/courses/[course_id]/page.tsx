"use client"

import {  FloatingIndicator, Loader, Overlay, Tabs } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useCallback, useEffect, useRef, useState } from "react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import classes from './tab.module.css'
import GeneralInfo from "@/views/teachers/create/screens/GeneralInfo"
import { api } from "@/lib/api-client"
import { useUser } from "@auth0/nextjs-auth0"
import { notifications } from "@mantine/notifications"
import { useParams } from "next/navigation"
import { modals } from "@mantine/modals"
import { Button } from "@mantine/core"


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
  const params = useParams();
  const courseId = params?.course_id;

  const [value, setValue] = useState('1')
  const [defaultValues, setDefaultValues] = useState<CourseForm | null>()
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
      const response: any = await api.put(`/api/course/${courseId}`, { ...values, teacherId: `${user?.sub}` }, { authType: 'token' })
      if (response && (response.status === 200 || response.status === 201)) {
        notifications.show({
          title: 'Амжилттай',
          message: 'Курс амжилттай шинэчлэгдлээ',
          color: 'green'
        })
      } else {
        notifications.show({
          title: 'Алдаа',
          message: response?.data?.message || 'Курс шинэчлэхэд алдаа гарлаа',
          color: 'red'
        })
      }
    } catch (error: any) {
      notifications.show({
        title: 'Алдаа',
        message: error?.message || 'Курс шинэчлэхэд алдаа гарлаа',
        color: 'red'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    modals.openConfirmModal({
      title: 'Курс устгах',
      children: 'Та энэ курсыг устгахдаа итгэлтэй байна уу?',
      labels: { confirm: 'Устгах', cancel: 'Болих' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          setLoading(true)
          await api.delete(`/api/course/${courseId}`, { authType: 'token' })
          notifications.show({
            title: 'Амжилттай',
            message: 'Курс амжилттай устгагдлаа',
            color: 'green'
          })
          // Optionally redirect or update UI here
        } catch (error: any) {
          notifications.show({
            title: 'Алдаа',
            message: error?.message || 'Курс устгахад алдаа гарлаа',
            color: 'red'
          })
        } finally {
          setLoading(false)
        }
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const data = await api.get<CourseForm>(`/api/course/${courseId}`, { authType: 'token' });
        if (data) {
          setDefaultValues(data)
          form.setValues({
            title: data.title || '',
            description: data.description || '',
            price: data.price || 0,
            teacherId: data.teacherId || `${user?.sub}`,
            templateImageUrl: data.templateImageUrl || '',
            lessons: data.lessons || []
          });
        }
        
        setLoading(false)
      } catch (e) {
        // Optionally handle error
        console.log('Failed to fetch course detail', e);
        setLoading(false)
      }
    };
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  return (
    <UserWrapper title="Багш / Хичээл шинэчлэх" >
      {loading && (
        <Overlay blur={1} center>
          <Loader size="lg" />
        </Overlay>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-2 gap-10 w-full h-max">
        <div className="text-2xl col-span-2 flex items-center justify-between">
          Цуврал хичээл шинэчлэх
          <Button color="red" variant="outline" onClick={handleDelete}>
            Устгах
          </Button>
        </div>
        
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
              <GeneralInfo form={form} defaultValues={defaultValues} />
            </Tabs.Panel>
            
          </Tabs>
        </div>

      </form>
    </UserWrapper>
  )
}