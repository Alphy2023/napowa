import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { RoleFormData, RoleResponse } from "@/types/roles"
import { RESOURCES } from "@/types/roles"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const sortBy = searchParams.get("sortBy") || "name"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    const skip = (page - 1) * limit

    // Build where clause for filtering
    const where: any = {}

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      }
    }

    // Get total count for pagination
    const total = await prisma.role.count({ where })

    // Fetch roles
    const roles = await prisma.role.findMany({
      where,
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
      orderBy: {
        [sortBy === "userCount" ? "users" : sortBy]: sortOrder,
      },
      skip,
      take: limit,
    })

    // Transform the data to match our interface
    const transformedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions as Record<string, string[]>,
      userCount: role._count.users,
      createdAt: role?.createdAt ? role?.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: role?.updatedAt ? role?.updatedAt.toISOString() : new Date().toISOString(),
    }))

    // Use the hardcoded resources
    const resources = Object.values(RESOURCES)

    const response: RoleResponse = {
      roles: transformedRoles,
      resources,
      total,
      page,
      limit,
    }

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Roles API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch roles",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RoleFormData = await request.json()
    const { name, permissions } = body

    // Check if role already exists
    const existingRole = await prisma.role.findUnique({
      where: { name },
    })

    if (existingRole) {
      return NextResponse.json(
        {
          success: false,
          message: "Role with this name already exists",
        },
        { status: 400 },
      )
    }

    // Create the role
    const role = await prisma.role.create({
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

    // Transform the response
    const transformedRole = {
      id: role.id,
      name: role.name,
      permissions: role.permissions as Record<string, string[]>,
      userCount: role._count.users,
      createdAt: role.createdAt.toISOString(),
      updatedAt: role.updatedAt.toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: transformedRole,
      message: "Role created successfully.",
    })
  } catch (error) {
    console.error("Role creation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create role.",
      },
      { status: 500 },
    )
  }
}
