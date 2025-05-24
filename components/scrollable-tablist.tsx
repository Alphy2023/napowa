// components/ScrollableTabs.tsx
import React from "react"
import { TabsList,TabsTrigger } from "@/components/ui/tabs"

type TabItem = {
  id: string
  title: string,
}

interface ScrollableTabsProps {
  items: TabItem[],
  noCenter?:boolean;
}

const ScrollableTablist: React.FC<ScrollableTabsProps> = ({ items,noCenter=false }) => {
  return (
    <TabsList className={`mb-8 flex flex-nowrap justify-start gap-2 tab-list   
     overflow-x-auto hide-scrollbar ${!noCenter && "md:justify-center"} md:gap-4 `}>
      {items?.map((item) => (
        <TabsTrigger
          key={item?.id}
          value={item?.id}
          className="flex-shrink-0 min-w-maxp px-4 py-2"
        >
          {item?.title}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

export default ScrollableTablist
