"use client"

import { LineChart as TremorLineChart, CustomTooltipProps } from "@tremor/react"

export interface TooltipProps {
  payload: Array<{
    value: number
    category: string
    payload: Record<string, number>
  }> | null
  active: boolean
  label: string
}

interface LineChartProps {
  className?: string
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
  customTooltip?: React.ComponentType<CustomTooltipProps>
}

export function LineChart({
  className,
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth = 40,
  showLegend = true,
  customTooltip,
}: LineChartProps) {
  return (
    <TremorLineChart
      className={className}
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      valueFormatter={valueFormatter}
      yAxisWidth={yAxisWidth}
      showLegend={showLegend}
      customTooltip={customTooltip}
    />
  )
} 