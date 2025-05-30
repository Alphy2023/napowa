import { PERMISSIONS_BY_ROLE } from "@/constants/mock-data";
import prisma from "@/lib/prisma";


async function main() {
for (const [roleName, permissions] of Object.entries(PERMISSIONS_BY_ROLE)) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: { permissions },
      create: {
        name: roleName,
        permissions,
      },
    })
  }

  console.log("✅ Seeded roles and permissions");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
