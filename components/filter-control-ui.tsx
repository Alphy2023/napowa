"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import { Grid3X3, List, RefreshCw, Search } from 'lucide-react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { PageFilters } from '@/types/filters'
import { ViewMode } from '@/types/view-mode.types'


interface FilterControlUIProps{
    filters:PageFilters;
    handleSearch:(value:string)=>void
    handleSortChange:(sortBy: PageFilters["sortBy"])=>void
    viewMode:ViewMode
    setViewMode:(mode:ViewMode)=>void
    loading:boolean
    refetch:()=>void;
}   

const FilterControlUI = ({filters,handleSearch,
    handleSortChange,viewMode,loading=false,
    setViewMode,refetch,
}:FilterControlUIProps) => {
  return (
    <Card>
        <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search roles..."
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                />
                </div>

                <Select value={filters.sortBy} 
                onValueChange={(value: PageFilters["sortBy"]) => handleSortChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="createdAt">Created Date</SelectItem>
                    {/* <SelectItem value="userCount">User Count</SelectItem> */}
                </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                >
                <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                >
                <List className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="sm" 
                onClick={refetch} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
            </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default FilterControlUI