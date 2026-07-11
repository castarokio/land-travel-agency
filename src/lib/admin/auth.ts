import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { adminSessionCookie, verifyAdminSessionToken } from "@/lib/admin/session";
import { prisma } from "@/lib/db/prisma";

const fallbackAdmin = {
  email: process.env.ADMIN_EMAIL ?? "admin@landtravel.dz",
  username: process.env.ADMIN_USERNAME ?? "admin",
  name: "Land Travel Admin",
  role: "admin"
};

function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL) && process.env.GITHUB_PAGES !== "true";
}

export async function validateAdminCredentials(email: string, password: string) {
  const normalizedIdentifier = email.trim().toLowerCase();

  if (canUseDatabase()) {
    try {
      const admin = await prisma.adminUser.findUnique({
        where: { email: normalizedIdentifier }
      });

      if (admin?.active && (await bcrypt.compare(password, admin.passwordHash))) {
        return {
          email: admin.email,
          name: admin.name,
          role: admin.role
        };
      }
    } catch {
      // Fall through to environment credentials for local/dev bootstrap.
    }
  }

  const envEmail = fallbackAdmin.email.toLowerCase();
  const envUsername = fallbackAdmin.username.toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD ?? "landtravel-admin-2026";
  const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const passwordMatches = envPasswordHash
    ? await bcrypt.compare(password, envPasswordHash)
    : password === envPassword;

  if ((normalizedIdentifier === envEmail || normalizedIdentifier === envUsername) && passwordMatches) {
    return fallbackAdmin;
  }

  return null;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(adminSessionCookie)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
