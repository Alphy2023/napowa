import prisma from "./prisma"

// Member functions
export async function getMembers(query = "", filter = "all", page = 1, limit = 10) {
  const skip = (page - 1) * limit

  let whereClause = {}

  if (query) {
    whereClause = {
      OR: [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    }
  }

  if (filter !== "all") {
    whereClause = {
      ...whereClause,
      memberType: filter,
    }
  }

  const members = await prisma.member.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  const total = await prisma.member.count({ where: whereClause })

  return { members, total, pages: Math.ceil(total / limit) }
}

export async function getMemberById(id: string) {
  return prisma.member.findUnique({
    where: { id },
  })
}

export async function createMember(data: any) {
  return prisma.member.create({
    data,
  })
}

export async function updateMember(id: string, data: any) {
  return prisma.member.update({
    where: { id },
    data,
  })
}

export async function deleteMember(id: string) {
  return prisma.member.delete({
    where: { id },
  })
}

// Blog functions
export async function getBlogs(query = "", filter = "all", page = 1, limit = 10, publishedOnly = false) {
  const skip = (page - 1) * limit

  const whereClause: any = {}

  if (publishedOnly) {
    whereClause.published = true
  }

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } },
      { excerpt: { contains: query, mode: "insensitive" } },
    ]
  }

  if (filter !== "all") {
    whereClause.category = filter
  }

  const blogs = await prisma.blog.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  const total = await prisma.blog.count({ where: whereClause })

  return { blogs, total, pages: Math.ceil(total / limit) }
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })
}

export async function getBlogById(id: string) {
  return prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })
}

export async function createBlog(data: any) {
  return prisma.blog.create({
    data,
  })
}

export async function updateBlog(id: string, data: any) {
  return prisma.blog.update({
    where: { id },
    data,
  })
}

export async function deleteBlog(id: string) {
  return prisma.blog.delete({
    where: { id },
  })
}

// Event functions
export async function getEvents(query = "", filter = "all", page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const whereClause: any = {}

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
    ]
  }

  if (filter !== "all") {
    whereClause.status = filter
  }

  const events = await prisma.event.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: { startDate: "desc" },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })

  const total = await prisma.event.count({ where: whereClause })

  return {
    events: events.map((event) => ({
      ...event,
      registrations: event._count.registrations,
    })),
    total,
    pages: Math.ceil(total / limit),
  }
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })
}

export async function createEvent(data: any) {
  return prisma.event.create({
    data,
  })
}

export async function updateEvent(id: string, data: any) {
  return prisma.event.update({
    where: { id },
    data,
  })
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({
    where: { id },
  })
}

// Event Registration functions
export async function registerForEvent(eventId: string, data: any) {
  return prisma.eventRegistration.create({
    data: {
      ...data,
      event: {
        connect: { id: eventId },
      },
      member: data.memberId
        ? {
            connect: { id: data.memberId },
          }
        : undefined,
    },
  })
}

export async function getEventRegistrations(eventId: string) {
  return prisma.eventRegistration.findMany({
    where: { eventId },
    include: {
      member: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

// Donation functions
export async function createDonation(data: any) {
  return prisma.donation.create({
    data,
  })
}

export async function getDonations(page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const donations = await prisma.donation.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  const total = await prisma.donation.count()

  return { donations, total, pages: Math.ceil(total / limit) }
}

// Volunteer functions
export async function createVolunteerApplication(data: any) {
  return prisma.volunteer.create({
    data,
  })
}

export async function getVolunteers(page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const volunteers = await prisma.volunteer.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  const total = await prisma.volunteer.count()

  return { volunteers, total, pages: Math.ceil(total / limit) }
}

// Partner functions
export async function createPartnerApplication(data: any) {
  return prisma.partner.create({
    data,
  })
}

export async function getPartners(page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const partners = await prisma.partner.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  const total = await prisma.partner.count()

  return { partners, total, pages: Math.ceil(total / limit) }
}

// Contact functions
export async function createContactMessage(data: any) {
  return prisma.contactMessage.create({
    data,
  })
}

export async function getContactMessages(page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const messages = await prisma.contactMessage.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  const total = await prisma.contactMessage.count()

  return { messages, total, pages: Math.ceil(total / limit) }
}
