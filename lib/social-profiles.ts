import type { SiteSettings } from "@/sanity/page-types";

export function getSocialProfiles(settings: SiteSettings | null) {
  const profiles = [
    { name: "Facebook", value: settings?.facebookUrl },
    { name: "TikTok", value: settings?.tiktokUrl },
    { name: "X", value: settings?.xUrl },
  ];
  return profiles.flatMap(({ name, value }) => {
    if (!value) return [];
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? [{ name, url: url.href }] : [];
    } catch {
      return [];
    }
  });
}
