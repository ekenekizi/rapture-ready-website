import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

const contentTags = new Map<string, string>([
  ["teaching", "teachings"],
  ["galleryPhoto", "gallery"],
  ["homePage", "ministry-pages"],
  ["aboutPage", "ministry-pages"],
  ["siteSettings", "site-settings"],
]);

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  // Never accept unsigned requests, even if the environment is misconfigured.
  if (!secret) {
    console.error("Sanity webhook secret is not configured.");
    return Response.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    // The helper verifies the raw body and waits briefly for Sanity queries
    // to reflect the committed change before we expire the cache.
    const parsed = await parseBody<unknown>(request, secret);
    if (parsed.isValidSignature !== true) {
      return Response.json({ error: "Invalid signature." }, { status: 401 });
    }
    body = parsed.body;
  } catch {
    return Response.json({ error: "Invalid webhook request." }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("_type" in body) ||
    typeof body._type !== "string" ||
    !("_id" in body) ||
    typeof body._id !== "string" ||
    !body._id
  ) {
    return Response.json({ error: "Expected a document ID and type." }, { status: 400 });
  }

  const tag = contentTags.get(body._type);
  if (!tag || body._id.startsWith("drafts.") || body._id.startsWith("versions.")) {
    return Response.json({ revalidated: false, ignored: true });
  }

  // A webhook cannot use updateTag. Expire immediately so the next request
  // fetches fresh data instead of serving another stale response.
  revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: true, tag });
}
