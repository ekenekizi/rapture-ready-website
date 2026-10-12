import Link from "next/link";
import { navigation, book } from "@/lib/content";
import { Container, Eyebrow } from "@/components/ui";
import { Wordmark } from "@/components/site-header";

export function SiteFooter() {
  return (
    <footer className="bg-paper py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark />

            <p className="mt-5 max-w-xs text-xs leading-6 text-muted">
              Biblical truth. Spiritual discernment.
              <br />A heart prepared for His return.
            </p>

            <p className="mt-5 font-serif text-xl">
              Be wise. Be watchful.
              <br />
              Be Rapture Ready.
            </p>
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

            <p className="mt-5 text-xs leading-6 text-muted">
              Profile links coming soon.
            </p>

            <ul className="mt-4 flex gap-5 text-xs sm:flex-col sm:gap-3">
              {["Facebook", "TikTok", "X"].map((name) => (
                <li key={name} className="text-muted">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-[10px] text-muted">
          <span>© Endtime Watch</span>
          <span>Watch. Discern. Be Ready.</span>
        </div>
      </Container>
    </footer>
  );
}
