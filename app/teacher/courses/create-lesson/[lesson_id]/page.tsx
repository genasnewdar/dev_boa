"use client"

import { ICourse } from "@/types"
import { api } from "@/lib/api-client"
import { useForm } from "@mantine/form"
import { showMessage } from "@/components"
import { useEffect, useState } from "react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { Button, Select, TextInput, Textarea, Group, Loader, Overlay } from "@mantine/core"
import { useParams, useRouter } from "next/navigation"

interface Attachment {
  title: string
  fileUrl: string
}

interface LessonForm {
  title: string
  description: string
  price: string
  videoUrl: string
  duration: string
  templateImageUrl: string
  attachments: Attachment[]
  courseId: string
}

export default function UpdateLesson() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.lesson_id;
  const [courseList, setCourseList] = useState<ICourse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [attachment, setAttachment] = useState<Attachment>({ title: '', fileUrl: '' })
  const [loading, setLoading] = useState(false)

  const form = useForm<LessonForm>({
    initialValues: {
      title: '',
      description: '',
      price: '',
      videoUrl: '',
      duration: '',
      templateImageUrl: '',
      attachments: [],
      courseId: ''
    },
    validate: {
      title: (value) => (!value ? 'Гарчиг оруулна уу' : null),
      description: (value) => (!value ? 'Тайлбар оруулна уу' : null),
      price: (value) => (!value ? 'Үнэ оруулна уу' : null),
      videoUrl: (value) => (!value ? 'Видео URL оруулна уу' : null),
      duration: (value) => (!value ? 'Хугацаа оруулна уу' : null),
      templateImageUrl: (value) => (!value ? 'Зургийн URL оруулна уу' : null),
      courseId: (value) => (!value ? 'Хичээлээ сонгоно уу' : null),
    }
  })

  useEffect(() => {
    fetchCourseList()
    fetchLesson()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId])

  const fetchCourseList = async () => {
    try {
      const response = await api.get<ICourse[]>('/api/course', {
        authType: 'token'
      })
      setCourseList(response ?? [])
    } catch (error) {
      console.log(error, 'fetchCourseList error')
    }
  }

  const fetchLesson = async () => {
    if (!lessonId) return
    try {
      setLoading(true)
      const data = await api.get<any>(`/api/course/lessons/${lessonId}`, { authType: 'token' })
      if (data) {
        form.setValues({
          title: data.title || '',
          description: data.description || '',
          price: data.price?.toString() || '',
          videoUrl: data.videoUrl || '',
          duration: data.duration?.toString() || '',
          templateImageUrl: data.templateImageUrl || '',
          attachments: data.attachments || [],
          courseId: data.course_id?.toString() || ''
        })
        setAttachments(data.attachments || [])
      }
    } catch (error) {
      showMessage('Хичээлийн мэдээлэл авахад алдаа гарлаа', 'red')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAttachment = () => {
    if (attachment.title && attachment.fileUrl) {
      const updated = [...attachments, { ...attachment }]
      setAttachments(updated)
      form.setFieldValue('attachments', updated)
      setAttachment({ title: '', fileUrl: '' })
    }
  }

  const handleRemoveAttachment = (idx: number) => {
    const updated = attachments.filter((_, i) => i !== idx)
    setAttachments(updated)
    form.setFieldValue('attachments', updated)
  }

  const handleSubmit = async (values: LessonForm) => {
    setLoading(true)
    try {
      const payload = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        videoUrl: values.videoUrl,
        duration: Number(values.duration),
        templateImageUrl: values.templateImageUrl,
        attachments: values.attachments
      }
      await api.put(`/api/course/lesson/${lessonId}`, payload, { authType: 'token' })
      showMessage('Хичээл амжилттай шинэчлэгдлээ', 'green')
    } catch (error) {
      showMessage('Хичээл шинэчлэхэд алдаа гарлаа', 'red')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await api.delete(`/api/course/lesson/${lessonId}`, { authType: 'token' })
      showMessage('Хичээл амжилттай устгагдлаа', 'green')
      router.back()
    } catch (error) {
      showMessage('Хичээл устгахад алдаа гарлаа', 'red')
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserWrapper title="Багш / Хичээл засах">
      {loading && (
        <Overlay blur={1} center>
          <Loader size="lg" />
        </Overlay>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-2 gap-10 w-full h-max">
        <div className="text-2xl col-span-2 flex items-center justify-between">
          Хичээл засах
          <Button color="red" variant="outline" onClick={handleDelete} loading={isLoading}>
            Устгах
          </Button>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="text-xl">Ерөнхий мэдээлэл</div>

          <TextInput
            label="Хичээлийн нэр"
            placeholder="Хичээлийн нэр"
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Тайлбар"
            placeholder="Өөрийн хичээлийн талаар дэлгэрэнгүй тайлбарлана уу."
            minRows={4}
            {...form.getInputProps('description')}
          />

          <Select
            label="Хичээлээ хавсаргах"
            placeholder="Хичээлээ хавсаргах"
            data={courseList.map((course) => ({
              value: course.id.toString(),
              label: course.title
            }))}
            value={form.values.courseId || null}
            onChange={value => form.setFieldValue('courseId', value || '')}
          />

          <TextInput
            label="Үнэ"
            placeholder="0"
            type="number"
            {...form.getInputProps('price')}
          />

          <TextInput
            label="Видео URL"
            placeholder="https://cdn.example.com/ai-intro.mp4"
            {...form.getInputProps('videoUrl')}
          />

          <TextInput
            label="Хугацаа (минут)"
            placeholder="7"
            type="number"
            {...form.getInputProps('duration')}
          />

          <TextInput
            label="Зургийн URL"
            placeholder="https://cdn.example.com/thumbnails/ai.png"
            {...form.getInputProps('templateImageUrl')}
          />

          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">Хавсралтууд</div>
            <Group>
              <TextInput
                label="Гарчиг"
                placeholder="Slide Deck"
                value={attachment.title}
                onChange={e => setAttachment({ ...attachment, title: e.target.value })}
              />
              <TextInput
                label="Файл URL"
                placeholder="https://cdn.example.com/attachments/slides.pdf"
                value={attachment.fileUrl}
                onChange={e => setAttachment({ ...attachment, fileUrl: e.target.value })}
              />
              <Button type="button" onClick={handleAddAttachment} size="xs">
                Нэмэх
              </Button>
            </Group>
            <div className="flex flex-col gap-2 mt-2">
              {attachments.map((att, idx) => (
                <Group key={idx} align="center">
                  <span>{att.title}</span>
                  <a href={att.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{att.fileUrl}</a>
                  <Button type="button" color="red" size="xs" onClick={() => handleRemoveAttachment(idx)}>
                    Устгах
                  </Button>
                </Group>
              ))}
            </div>
          </div>
        </div>
        <div />
        <Button type="submit" size="sm" className="w-max" loading={isLoading}>
          Шинэчлэх
        </Button>
      </form>
    </UserWrapper>
  )
}