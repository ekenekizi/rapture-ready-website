import Link from "next/link";
import { navigation, book } from "@/lib/content";
import { Container, Eyebrow } from "@/components/ui";
import { Wordmark } from "@/components/site-header";
import { getSiteSettings } from "@/sanity/lib/pages";
import { getSocialProfiles } from "@/lib/social-profiles";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const profiles = getSocialProfiles(settings);
  return (
    <footer className="site-footer bg-paper py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark />

            {settings?.footerDescription && (
              <p className="mt-5 max-w-xs text-xs leading-6 whitespace-pre-line text-muted">
                {settings.footerDescription}
              </p>
            )}
            {settings?.footerSlogan && (
              <p className="mt-5 font-serif text-xl whitespace-pre-line">
                {settings.footerSlogan}
              </p>
            )}
          </div>

          <div>
            <Eyebrow>Explore</Eyebrow>

            <ul className="mt-5 space-y-3 text-xs text-muted">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow>Read & study</Eyebrow>

            <ul className="mt-5 space-y-3 text-xs text-muted">
              <li>
                <Link href={`/library/${book.slug}`}>{book.title}</Link>
              </li>

              <li>
                <Link href="/teachings">Biblical Teachings</Link>
              </li>

              <li>
                <Link href="/about">Our Mission</Link>
              </li>
            </ul>
          </div>

          <div>
            <Eyebrow>Follow the ministry</Eyebrow>

            {profiles.length ? (
              <ul className="mt-5 flex gap-5 text-xs sm:flex-col sm:gap-3">
                {profiles.map((profile) => (
                  <li key={profile.name}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-navy"
                    >
                      {profile.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-xs leading-6 text-muted">
                Social media links will be available soon.
              </p>
            )}
            {settings?.contactEmail && (
              <a
                className="mt-5 inline-block text-xs text-muted underline underline-offset-4"
                href={`mailto:${encodeURIComponent(settings.contactEmail)}`}
              >
                Contact the ministry
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-[10px] text-muted">
          <span>© Endtime Watch</span>
        </div>
      </Container>
    </footer>
  );
}
