import { SignJWT, jwtVerify } from "jose";

export const adminSessionCookie = "landtravel_admin_session";

export interface AdminSession {
  email: string;
  name: string;
  role: string;
}

function getSessionSecret() {
  return new TextEncoder().encode(
    process.env.ADMIN_SESSION_SECRET ?? "land-travel-local-development-session-secret"
  );
}

export async function createAdminSessionToken(session: AdminSession) {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSessionSecret());
}

export async function verifyAdminSessionToken(token?: string): Promise<AdminSession | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());

    if (
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }

    return {
      email: payload.email,
      name: payload.name,
      role: payload.role
    };
  } catch {
    return null;
  }
}

