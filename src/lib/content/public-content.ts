import { Prisma } from "@prisma/client";
import {
  CanonicalContent,
  ContentKey,
  canonicalContent,
  contentKeys,
  getStaticContent
} from "@/content/canonical-content";
import { prisma } from "@/lib/db/prisma";

function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL) && process.env.GITHUB_PAGES !== "true";
}

async function readContentEntry<K extends keyof CanonicalContent>(key: K): Promise<CanonicalContent[K]> {
  if (!canUseDatabase()) {
    return getStaticContent(key);
  }

  try {
    const entry = await prisma.contentEntry.findUnique({
      where: { key: key as ContentKey }
    });

    if (!entry?.published) {
      return getStaticContent(key);
    }

    return entry.data as CanonicalContent[K];
  } catch {
    return getStaticContent(key);
  }
}

export async function getPublicContent() {
  const entries = await Promise.all(
    Object.keys(canonicalContent).map(async (key) => [
      key,
      await readContentEntry(key as keyof CanonicalContent)
    ])
  );

  return Object.fromEntries(entries) as CanonicalContent;
}

export async function getSiteConfig() {
  return readContentEntry(contentKeys.siteConfig);
}

export async function getNavigationItems() {
  return readContentEntry(contentKeys.navigation);
}

export async function getTourismDestinations() {
  return readContentEntry(contentKeys.tourismDestinations);
}

export async function getDestinationById(id: string) {
  const destinations = await getTourismDestinations();
  return destinations.find((destination) => destination.id === id);
}

export async function getStudyCountries() {
  return readContentEntry(contentKeys.studyCountries);
}

export async function getUniversities() {
  return readContentEntry(contentKeys.universities);
}

export function toPrismaJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}
