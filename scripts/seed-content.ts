import bcrypt from "bcryptjs";
import { canonicalEntries } from "../src/content/canonical-content";
import { prisma } from "../src/lib/db/prisma";
import { toPrismaJson } from "../src/lib/content/public-content";

async function main() {
  for (const entry of canonicalEntries) {
    await prisma.contentEntry.upsert({
      where: { key: entry.key },
      update: {
        type: entry.type,
        title: entry.title,
        data: toPrismaJson(entry.data),
        published: true
      },
      create: {
        key: entry.key,
        type: entry.type,
        title: entry.title,
        data: toPrismaJson(entry.data),
        published: true
      }
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@landtravel.dz";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-this-before-production";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? (await bcrypt.hash(adminPassword, 12));

  await prisma.adminUser.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      name: "Land Travel Admin",
      passwordHash,
      role: "admin",
      active: true
    },
    create: {
      email: adminEmail.toLowerCase(),
      name: "Land Travel Admin",
      passwordHash,
      role: "admin",
      active: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
