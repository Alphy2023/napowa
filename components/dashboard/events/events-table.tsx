"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash } from "lucide-react"
import { deleteEvent } from "@/hooks/use-events"
import { useToast } from "@/hooks/use-toast"
import type { Event } from "@prisma/client"

interface EventsTableProps {
  events: Event[]
  isLoading: boolean
  pagination?: any
  onPageChange?: (page: number) => void
  onRefresh?: () => void
}

export function EventsTable({
  events,
  isLoading,
  pagination,
  onPageChange,
  onRefresh,
}: EventsTableProps) {
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      await deleteEvent(id)
      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
      onRefresh?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading events...</div>
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{event.location || "Virtual"}</TableCell>
                <TableCell>{event.capacity || "Unlimited"}</TableCell>
                <TableCell>{event.registeredCount}</TableCell>
                <TableCell>
                  <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                    {event.status}
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
                    onClick={() => handleDelete(event.id)}
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
