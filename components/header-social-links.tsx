import type { getSocialProfiles } from "@/lib/social-profiles";

type SocialProfiles = ReturnType<typeof getSocialProfiles>;
const paths = {
  Facebook: "M14 21v-8h3l.5-4H14V7c0-1.1.3-2 2-2h1.7V1.4A22 22 0 0 0 15.2 1C12.4 1 10.5 2.7 10.5 6v3H7v4h3.5v8z",
  TikTok: "M16.7 2c.4 2.2 1.7 3.6 4 3.8v3.4a9 9 0 0 1-4-1.2v7a6 6 0 1 1-5.2-5.9v3.5a2.6 2.6 0 1 0 1.8 2.4V2z",
  X: "M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-7.4L5.6 22H2.4l8.2-9.5L.8 2h6.4l4.4 6.7L18.9 2zm-1.1 18h1.7L6.2 3.9H4.4L17.8 20z",
};

export function HeaderSocialLinks({ profiles }: { profiles: SocialProfiles }) {
  return (
    <nav className="header-socials" aria-label="Social media">
      {Object.entries(paths).map(([name, path]) => {
        const profile = profiles.find((item) => item.name === name);
        const icon = <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={path} /></svg>;
        return profile ? (
          <a key={name} href={profile.url} aria-label={name} title={name} target="_blank" rel="noopener noreferrer">{icon}</a>
        ) : (
          <span key={name} role="link" aria-disabled="true" aria-label={name + " (profile coming soon)"} title={name + " — profile link coming soon"}>{icon}</span>
        );
      })}
    </nav>
  );
}
