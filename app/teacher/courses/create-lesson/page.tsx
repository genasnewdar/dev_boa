"use client"

import { ICourse } from "@/types"
import { api } from "@/lib/api-client"
import { useForm } from "@mantine/form"
import { showMessage } from "@/components"
import { useEffect, useState } from "react"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { Button, Select, TextInput, Textarea, Group, Loader, Overlay } from "@mantine/core"

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

export default function CreateLesson() {
  const [courseList, setCourseList] = useState<ICourse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [attachment, setAttachment] = useState<Attachment>({ title: '', fileUrl: '' })

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
  }, [])

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
    setIsLoading(true)
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
      await api.post(`/api/course/${values.courseId}/lesson`, payload, { authType: 'token' })
      showMessage('Хичээл амжилттай үүслээ', 'green')
      form.reset()
      setAttachments([])
    } catch (error) {
      showMessage('Хичээл үүсгэхэд алдаа гарлаа', 'red')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserWrapper title="Багш / Хичээл үүсгэх">
      {isLoading && (
        <Overlay blur={1} center>
          <Loader size="lg" />
        </Overlay>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-2 gap-10 w-full h-max">
        <div className="text-2xl col-span-2">Хичээл үүсгэх</div>
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
          Үүсгэх
        </Button>
      </form>
    </UserWrapper>
  )
}