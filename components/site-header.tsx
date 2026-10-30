import Image from "next/image";
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
      className="inline-flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <Image
        src="/images/endtime-watch-logo.png"
        alt="Endtime Watch"
        width={512}
        height={512}
        sizes="(max-width: 767px) 64px, 72px"
        className="h-16 w-16 object-contain md:h-[72px] md:w-[72px]"
      />
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
              <NavigationLink key={item.href} href={item.href}>
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
