import { Button, TextInput, Textarea, Group, Box } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useEffect, useState } from "react"

export interface Attachment {
  title: string;
  fileUrl: string;
}

export interface Lesson {
  title: string;
  description: string;
  price: number;
  videoUrl: string;
  attachments?: Attachment[];
}

export interface Course {
  title: string;
  description: string;
  price: number;
  teacherId: string;
  templateImageUrl: string;
  lessons: Lesson[];
}

interface GeneralInfoProps {
  form: UseFormReturnType<Course>
  defaultValues?: any
}

export default function GeneralInfo({ form, defaultValues }: GeneralInfoProps) {
  // Ensure lessons is always an array and sync with defaultValues
  const [lessonFields, setLessonFields] = useState<Array<Lesson>>(
    Array.isArray(form.values.lessons) ? form.values.lessons : []
  )

  useEffect(() => {
    if (defaultValues && Array.isArray(defaultValues.lessons)) {
      setLessonFields(defaultValues.lessons)
      form.setFieldValue('lessons', defaultValues.lessons)
    }
  }, [defaultValues, form])

  // Add lesson
  const addLesson = () => {
    const updated = [
      ...lessonFields,
      { title: '', description: '', price: 0, videoUrl: '', attachments: [] }
    ]
    setLessonFields(updated)
    form.setFieldValue('lessons', updated)
  }

  // Remove lesson
  const removeLesson = (idx: number) => {
    const updated = lessonFields.filter((_, i) => i !== idx)
    setLessonFields(updated)
    form.setFieldValue('lessons', updated)
  }

  // Update lesson field
  const updateLesson = (idx: number, key: keyof Lesson, value: any) => {
    const updated = lessonFields.map((lesson, i) =>
      i === idx ? { ...lesson, [key]: value } : lesson
    )
    setLessonFields(updated)
    form.setFieldValue('lessons', updated)
  }

  // Add attachment to lesson
  const addAttachment = (lessonIdx: number) => {
    const updated = lessonFields.map((lesson, i) =>
      i === lessonIdx
        ? {
            ...lesson,
            attachments: [
              ...(lesson.attachments || []),
              { title: '', fileUrl: '' }
            ]
          }
        : lesson
    )
    setLessonFields(updated)
    form.setFieldValue('lessons', updated)
  }

  // Remove attachment from lesson
  const removeAttachment = (lessonIdx: number, attIdx: number) => {
    const updated = lessonFields.map((lesson, i) =>
      i === lessonIdx
        ? {
            ...lesson,
            attachments: (lesson.attachments || []).filter((_, j) => j !== attIdx)
          }
        : lesson
    )
    setLessonFields(updated)
    form.setFieldValue('lessons', updated)
  }

  // Update attachment field
  const updateAttachment = (lessonIdx: number, attIdx: number, key: keyof Attachment, value: any) => {
    const updated = lessonFields.map((lesson, i) =>
      i === lessonIdx
        ? {
            ...lesson,
            attachments: (lesson.attachments || []).map((att, j) =>
              j === attIdx ? { ...att, [key]: value } : att
            )
          }
        : lesson
    )
    setLessonFields(updated)
    form.setFieldValue('lessons', updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.onSubmit((values) => {
      // You can handle the submit logic here, or pass it up via props
      // For demo: just log
      console.log('Course submit:', values);
    })();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-10 w-full">
        <div className="flex flex-col gap-6 w-full">
          <TextInput
            label="Багцын нэр"
            placeholder="Багцын нэр"
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Тайлбар"
            placeholder="Өөрийн хичээлийн талаар дэлгэрэнгүй тайлбарлана уу."
            minRows={4}
            {...form.getInputProps('description')}
          />

          <TextInput
            label="Үнэ"
            placeholder="0"
            type="number"
            {...form.getInputProps('price')}
            rightSection="₮"
          />

          <TextInput
            label="Зургийн URL"
            placeholder="https://image.com/1"
            {...form.getInputProps('templateImageUrl')}
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <Group justify="space-between" align="center">
            <div className="text-lg font-semibold">Хичээлүүд</div>
            <Button onClick={addLesson} size="xs">+ Хичээл нэмэх</Button>
          </Group>
          {lessonFields.map((lesson, idx) => (
            <Box key={idx} p="md" style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 16 }}>
              <Group justify="space-between" align="center" mb={8}>
                <div className="font-medium">Хичээл {idx + 1}</div>
                <Button color="red" size="xs" onClick={() => removeLesson(idx)}>Устгах</Button>
              </Group>
              <TextInput
                label="Гарчиг"
                placeholder="Lesson title"
                value={lesson.title}
                onChange={e => updateLesson(idx, 'title', e.target.value)}
                mb={8}
              />
              <Textarea
                label="Тайлбар"
                placeholder="Lesson description"
                value={lesson.description}
                onChange={e => updateLesson(idx, 'description', e.target.value)}
                mb={8}
              />
              <TextInput
                label="Үнэ"
                placeholder="0"
                type="number"
                value={lesson.price}
                onChange={e => updateLesson(idx, 'price', Number(e.target.value))}
                rightSection="₮"
                mb={8}
              />
              <TextInput
                label="Видео URL"
                placeholder="https://video.com/1"
                value={lesson.videoUrl}
                onChange={e => updateLesson(idx, 'videoUrl', e.target.value)}
                mb={8}
              />
              <Group justify="space-between" align="center" mt={8}>
                <div className="font-medium">Хавсралтууд</div>
                <Button size="xs" onClick={() => addAttachment(idx)}>+ Хавсралт нэмэх</Button>
              </Group>
              {(lesson.attachments || []).map((att, attIdx) => (
                <Group key={attIdx} align="center" mt={4}>
                  <TextInput
                    label="Гарчиг"
                    placeholder="Slide deck"
                    value={att.title}
                    onChange={e => updateAttachment(idx, attIdx, 'title', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <TextInput
                    label="Файл URL"
                    placeholder="https://cdn.com/file.pdf"
                    value={att.fileUrl}
                    onChange={e => updateAttachment(idx, attIdx, 'fileUrl', e.target.value)}
                    style={{ flex: 2 }}
                  />
                  <Button color="red" size="xs" onClick={() => removeAttachment(idx, attIdx)}>Устгах</Button>
                </Group>
              ))}
            </Box>
          ))}
        </div>
      </div>
      <Group mt="xl" >
        <Button type="submit" color="primary">
          Хадгалах
        </Button>
      </Group>
    </>
  )
}