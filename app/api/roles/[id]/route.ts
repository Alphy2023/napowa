import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { RoleFormData } from "@/types/roles"


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: RoleFormData = await request.json()
    const { name, permissions } = body

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: params.id },
    })

    if (!existingRole) {
      return NextResponse.json({ success: false, error: "Role not found" }, { status: 404 })
    }

    // Check if name is being changed and if it conflicts with another role
    if (name !== existingRole.name) {
      const nameConflict = await prisma.role.findUnique({
        where: { name },
      })

      if (nameConflict) {
        return NextResponse.json(
          {
            success: false,
            message: "Another role with this name already exists",
          },
          { status: 400 },
        )
      }
    }

    // Update the role
    const role = await prisma.role.update({
      where: { id: params.id },
      data: {
        name,
        permissions,
      },
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
    })

    const transformedRole = {
      id: role.id,
      name: role.name,
      permissions: role.permissions as Record<string, string[]>,
      userCount: role._count.users,
      createdAt: role.createdAt ? role.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: role.updatedAt ? role.updatedAt.toISOString() : new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: transformedRole,
      message: "Role updated successfully",
    })
  } catch (error) {
    console.error("Role update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update role" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if role has users
    const roleWithUsers = await prisma.role.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
    })

    if (!roleWithUsers) {
      return NextResponse.json({ success: false, error: "Role not found" }, { status: 404 })
    }

    if (roleWithUsers._count.users > 0) {
      return NextResponse.json({ success: false, error: "Cannot delete role with assigned users" }, { status: 400 })
    }

    // Delete the role
    await prisma.role.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: "Role deleted successfully",
    })
  } catch (error) {
    console.error("Role deletion error:", error)
    return NextResponse.json({ success: false, 
      message: "Failed to delete role" }, { status: 500 })
  }
}
