"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { ProgramCategory } from "@prisma/client"

interface ProgramCategoriesSidebarProps {
  categories: ProgramCategory[]
  selectedId?: string
  onSelect: (id: string | undefined) => void
  onCategoriesChange?: () => void
}

export function ProgramCategoriesSidebar({
  categories,
  selectedId,
  onSelect,
  onCategoriesChange,
}: ProgramCategoriesSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-2">Categories</h3>
        <Button size="sm" className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <Button
          variant={selectedId === undefined ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelect(undefined)}
        >
          All Programs
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedId === category.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
