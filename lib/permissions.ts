import { prisma } from '@/lib/prisma';

export async function hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
    },
  });

  if (!user || !user.role) {
    return false;
  }

  const permissions = user.role.permissions as Record<string, string[]>;
  return permissions[resource]?.includes(action) ?? false;
}
