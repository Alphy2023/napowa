"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { X, Plus } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  disabled?: boolean
}

export function TagInput({
  tags,
  onChange,
  placeholder = "Add item...",
  maxTags = 20,
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const trimmedInput = inputValue.trim()
    if (trimmedInput && !tags.includes(trimmedInput) && tags.length < maxTags) {
      onChange([...tags, trimmedInput])
      setInputValue("")
    }
  }

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove))
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div 
      className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-[42px] focus-within:ring-1 focus-within:ring-ring focus-within:border-input"
      onClick={focusInput}
    >
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-sm py-1 px-2 gap-1">
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(index)
              }}
              className="ml-1 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          )}
        </Badge>
      ))}
      {!disabled && tags.length < maxTags && (
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      )}
      {!disabled && inputValue && (
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={addTag}
          className="h-6 px-2 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      )}
    </div>
  )
}
