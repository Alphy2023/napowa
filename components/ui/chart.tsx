import * as React from "react"

export const Chart = ({
  children,
  data,
  dataKey,
  categories,
  colors,
  valueFormatter,
  showLegend,
}: {
  children: React.ReactNode
  data: any[]
  dataKey: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
}) => {
  return React.cloneElement(React.Children.only(children) as React.ReactElement, {
    data,
    dataKey,
    categories,
    colors,
    valueFormatter,
    showLegend,
  })
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltipContent = () => {
  return <></>
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartLegendItem = () => {
  return <></>
}

export const ChartGrid = () => {
  return <></>
}

export const ChartXAxis = () => {
  return <></>
}

export const ChartYAxis = () => {
  return <></>
}

export const ChartArea = ({ className }: { className?: string }) => {
  return <div className={className}></div>
}

export const ChartLine = ({ className }: { className?: string }) => {
  return <div className={className}></div>
}

export const ChartBar = ({ className }: { className?: string }) => {
  return <div className={className}></div>
}
