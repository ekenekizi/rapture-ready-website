import Link from "next/link";
import { navigation } from "@/lib/content";
import { Container, ButtonLink } from "@/components/ui";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { HeaderSocialLinks } from "@/components/header-social-links";
import { getSiteSettings } from "@/sanity/lib/pages";
import { getSocialProfiles } from "@/lib/social-profiles";
import { NavigationLink } from "@/components/navigation-link";

export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="Endtime Watch home"
      className="inline-flex items-center gap-3 whitespace-nowrap font-serif text-2xl md:text-3xl"
    >
      <svg
        width="25"
        height="33"
        viewBox="0 0 25 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-gold"
        aria-hidden="true"
      >
        <path d="M1 32V13a11.5 11.5 0 0 1 23 0v19ZM12.5 9v16M7.5 15h10" />
      </svg>
      Endtime Watch
    </Link>
  );
}

export async function SiteHeader() {
  const profiles = getSocialProfiles(await getSiteSettings());
  return (
    <>
    <header className="site-header sticky top-0 z-40 border-b border-border bg-ivory/95 backdrop-blur-sm">
      <Container className="site-header-inner relative flex h-20 items-center justify-between gap-6">
        <Wordmark />

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 text-xs lg:flex"
        >
          {navigation.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
            >
              {item.label}
            </NavigationLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <HeaderSocialLinks profiles={profiles} />
          <div className="hidden lg:block">
            <ButtonLink href="/library">Explore Library</ButtonLink>
          </div>
        </div>
      </Container>
    </header>
    <MobileBottomNav />
    </>
  );
}
