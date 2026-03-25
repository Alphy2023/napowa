"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash } from "lucide-react"
import { deleteProgram } from "@/hooks/use-programs"
import { useToast } from "@/hooks/use-toast"
import type { Program } from "@prisma/client"

interface ProgramsTableProps {
  programs: Program[]
  isLoading: boolean
  pagination?: any
  onPageChange?: (page: number) => void
  onRefresh?: () => void
}

export function ProgramsTable({
  programs,
  isLoading,
  pagination,
  onPageChange,
  onRefresh,
}: ProgramsTableProps) {
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      await deleteProgram(id)
      toast({
        title: "Success",
        description: "Program deleted successfully",
      })
      onRefresh?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete program",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading programs...</div>
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Enrolled</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No programs found
              </TableCell>
            </TableRow>
          ) : (
            programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.title}</TableCell>
                <TableCell>{program.categoryId}</TableCell>
                <TableCell>{program.duration || "N/A"}</TableCell>
                <TableCell>{program.enrolledCount}</TableCell>
                <TableCell>
                  <Badge variant={program.isActive ? "default" : "secondary"}>
                    {program.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(program.id)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
