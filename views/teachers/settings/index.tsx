'use client'

import { GeneralInfoSection } from "./screens/GeneralInfoSection"
import UserWrapper from "@/components/wrapper/UserWrapper"
import { IconBell, IconMail } from "@tabler/icons-react"
import { SafetySection } from "./screens/SafetySection"
import { Button, Flex } from "@mantine/core"
import { useState } from "react"

type TabType = 'general-info' | 'safety'

export const TeacherSettings = () => {
    const [tabValue, setTabValue] = useState<TabType>('general-info')

    const getScreen = () => {
        switch (tabValue) {
            case 'general-info':
                return <GeneralInfoSection />
            case 'safety':
                return <SafetySection />
            default:
                return ''
        }
    }

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Багш", path: "/teacher" },
                { label: "Засвар" }
            ]}
            headerIcons={
                <Flex gap={20} className="text-primary-600">
                    <IconBell className="cursor-pointer" />
                </Flex>
            }
        >
            <div className="w-full h-full flex gap-8 flex-col">
                <Flex gap={24}>
                    <Button
                        radius={10}
                        onClick={() => setTabValue('general-info')}
                        variant={tabValue === 'general-info' ? "outline" : "default"}
                        className={tabValue === 'general-info' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                    >
                        Ерөнхий мэдээлэл
                    </Button>
                    <Button
                        radius={10}
                        onClick={() => setTabValue('safety')}
                        variant={tabValue !== 'general-info' ? "outline" : "default"}
                        className={tabValue !== 'general-info' ? '!bg-primary-600/10' : '!bg-transparent !border-none'}
                    >
                        Аюулгүй байдал
                    </Button>
                </Flex>
                <div className="flex-1"> {getScreen()} </div>
            </div>
        </UserWrapper>
    )
}