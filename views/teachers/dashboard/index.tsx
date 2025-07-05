"use client"

import React from 'react'
import { IconCurrencyDollar, IconPlayerPlay, IconSchool } from "@tabler/icons-react"
import { LineChart } from "@/components/LineChart"
import { CustomTooltipProps } from "@tremor/react"
import Image from 'next/image'
import UserWrapper from '@/components/wrapper/UserWrapper'

interface Issue {
  status: "completed"
  value: number
  percentage: number
}

interface DataEntry {
  date: string
  issues: Issue[]
}

const data: DataEntry[] = [
  {
    date: "1-р сар",
    issues: [
      {
        status: "completed",
        value: 47,
        percentage: 100,
      }
    ],
  },
  {
    date: "2-р сар",
    issues: [
      {
        status: "completed",
        value: 83,
        percentage: 100,
      }
    ],
  },
  {
    date: "3-р сар",
    issues: [
      {
        status: "completed",
        value: 30,
        percentage: 100,
      }
    ],
  },
  {
    date: "4-р сар",
    issues: [
      {
        status: "completed",
        value: 41,
        percentage: 100,
      }
    ],
  },
  {
    date: "5-р сар",
    issues: [
      {
        status: "completed",
        value: 55,
        percentage: 100,
      }
    ],
  },
  {
    date: "6-р сар",
    issues: [
      {
        status: "completed",
        value: 35,
        percentage: 100,
      }
    ],
  }
]

// Transform data into a format suitable for LineChart
const formattedArray = data.map((entry) => ({
  date: entry.date,
  value: entry.issues[0].value
}))

const valueFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString()
}

const status = {
  completed: "bg-blue-500"
}

const Tooltip = ({ payload, active, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const value = Number(payload[0].value)

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-md">
      <span className="font-medium text-gray-900">
        {value}
      </span>
    </div>
  )
}

function TeacherDashboard() {
    return (
        <UserWrapper 
            breadcrumbs={[
                { label: "Багш", path: "/teacher" },
                { label: "Хяналтын самбар" }
            ]}
        >
            <div className="w-full h-full flex flex-col gap-10 ">
                <div className="grid grid-cols-4 gap-5 w-full">
                    <div className="w-full p-4 rounded-lg bg-white flex flex-row items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <IconSchool size={20}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-gray-400 text-sm">Нийт оруулсан хичээл</div>
                            <div>21</div>
                        </div>
                    </div>
                    <div className="w-full p-4 rounded-lg bg-white flex flex-row items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <IconCurrencyDollar size={20}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-gray-400 text-sm">Орлогын дүн</div>
                            <div>₮123,352</div>
                        </div>
                    </div>
                    <div className="w-full p-4 rounded-lg bg-white flex flex-row items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <IconPlayerPlay size={20}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-gray-400 text-sm">Үзсэн хугацаа (цаг)</div>
                            <div>124.2</div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-5">
                    <div className="text-2xl">Сурагчдын үзүүлэлт</div>
                    <div className="w-full bg-white p-5 rounded-lg">
                        <LineChart
                            className="h-64"
                            data={formattedArray}
                            index="date"
                            categories={["value"]}
                            colors={["tremor-brand"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={35}
                            showLegend={false}
                            customTooltip={Tooltip}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2 flex flex-col gap-5">
                        <div className="text-2xl">Хамгийн үзэлттэй хичээлүүд</div>
                        <div className="w-full bg-white p-5 rounded-lg flex flex-col">
                            {
                                Array.from({length: 10}).map((_, index) => (
                                    <div key={index} className="flex flex-row items-center justify-between gap-2 py-3 border-t border-gray-200">
                                        <div className="flex flex-row items-center gap-5">
                                            <Image src="/images/certificate.png" alt="course" width={140} height={50} className='rounded-lg overflow-hidden shadow-md' />
                                            <div className="flex flex-col">
                                                <div className="text-sm">Python програмчлалын хичээл - 1 - Танилцуулга</div>
                                                <div className='text-xs'>2024 / 09 / 01</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-5">
                                            <div className="text-sm">1:09 цаг <span className='text-gray-400'>32.2%</span></div>
                                            <div className="text-sm">1,106 <span className='text-gray-400'>Үзсэн</span></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-5">
                        <div className="text-2xl">Сүүлийн сэтгэгдэл</div>
                        <div className="w-full bg-white p-5 rounded-lg">
                            {
                                Array.from({length: 5}).map((_, index) => (
                                    <div key={index} className="flex flex-col gap-2 py-3">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image src="/images/certificate.png" alt="avatar" width={40} height={40} className='rounded-full shadow-md' />
                                            <div className="flex flex-row items-center gap-2">
                                                <div className="text-sm">amena</div>
                                                <div className="text-xs">3 сарын өмнө</div>
                                            </div>
                                        </div>
                                        <div className="text-sm">Энэ мундаг залуус шиг болоход ямар ямар чадвар сурах шаардлагатай талаар оюутан дүү нартаа энгийнээр тайлбарлаж өгвөл энэ салбарын дүү нар чинь их үзнэ дээ ххэ</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </UserWrapper>
    )
}

export default TeacherDashboard