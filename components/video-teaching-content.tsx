import Link from "next/link";
import type { PublishedTeaching, TeachingSummary } from "@/sanity/types";
import { TeachingVideoPlayer } from "@/components/teaching-video-player";
import { VideoThumbnail } from "@/components/video-thumbnail";
import { TeachingBody } from "@/components/teaching-body";
import { ShareTeachingButton } from "@/components/share-teaching-button";
import { teachingMediaUrl, videoDuration } from "@/lib/video-teachings";
import { teachingImageUrl } from "@/sanity/lib/image";
export function VideoTeachingContent({
  teaching,
  related,
}: {
  teaching: PublishedTeaching;
  related: TeachingSummary[];
}) {
  const src = teachingMediaUrl(teaching.video?.url);
  if (!src) return null;
  return (
    <div className="video-watch-page video-surface">
      <Link className="textlink video-back-link" href="/teachings?format=watch">
        ← Video teachings
      </Link>
      <header className="video-watch-heading">
        <div className="eyebrow gold">{teaching.category} · VIDEO TEACHING</div>
        <h1>{teaching.title}</h1>
        <div className="video-watch-byline">
          <span>
            {teaching.author} · {videoDuration(teaching.durationSeconds)} ·{" "}
            {teaching.videoLabel || "Video teaching"}
          </span>
          <ShareTeachingButton
            title={teaching.title}
            slug={teaching.slug}
            excerpt={teaching.excerpt}
            label="Share video"
            contentKind="video"
          />
        </div>
      </header>
      <div className="video-watch-layout">
        <div>
          <TeachingVideoPlayer
            key={src}
            src={src}
            poster={teachingImageUrl(teaching.coverImage, 1600) || undefined}
            title={teaching.title}
            captions={teachingMediaUrl(teaching.captions?.url)}
            language={teaching.captionsLanguage || "en"}
          />
          <div className="video-under-player">
            <span>
              {videoDuration(teaching.durationSeconds)} ·{" "}
              {teaching.videoLabel || "Video teaching"}
            </span>
            <span>Watch at your own pace</span>
          </div>
          <div className="video-watch-copy">
            <section>
              <div className="eyebrow gold">ABOUT THIS TEACHING</div>
              <h2>
                A few minutes.
                <br />A thought to carry with you.
              </h2>
              <p className="whitespace-pre-line">{teaching.excerpt}</p>
            </section>
            {teaching.scriptureQuote ? (
              <blockquote className="video-watch-scripture">
                <p>“{teaching.scriptureQuote}”</p>
                <cite>{teaching.scripture}</cite>
              </blockquote>
            ) : (
              <p className="my-8 border-l-2 border-gold pl-5 text-sm text-muted">
                Scripture: {teaching.scripture}
              </p>
            )}
            {!!teaching.reflectionPoints?.length && (
              <section>
                <div className="eyebrow">REFLECT & RESPOND</div>
                <h3>Take the teaching into your day.</h3>
                <ul>
                  {teaching.reflectionPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <p className="video-study-prompt">
                  Read the passage in context, bring your questions into prayer,
                  and consider one faithful response today.
                </p>
              </section>
            )}
            {teaching.body.length > 0 && (
              <section className="mt-9">
                <div className="eyebrow">STUDY NOTES & TRANSCRIPT</div>
                <div className="mt-6">
                  <TeachingBody value={teaching.body} />
                </div>
              </section>
            )}
            <section className="video-pass-along">
              <div>
                <h3>Pass the Word along.</h3>
                <p>
                  Share this teaching with someone who would find it
                  encouraging.
                </p>
              </div>
              <ShareTeachingButton
                title={teaching.title}
                slug={teaching.slug}
                excerpt={teaching.excerpt}
                variant="button"
                contentKind="video"
              />
            </section>
          </div>
        </div>
        <aside className="video-up-next">
          <div className="eyebrow">CONTINUE WATCHING</div>
          <h2>More from the ministry.</h2>
          {related.length ? (
            related.map((item) => (
              <article key={item._id}>
                <VideoThumbnail teaching={item} />
                <div className="eyebrow gold">{item.category}</div>
                <h3>
                  <Link href={`/teachings/${encodeURIComponent(item.slug)}`}>
                    {item.title}
                  </Link>
                </h3>
                <p>
                  {videoDuration(item.durationSeconds)} · {item.scripture}
                </p>
              </article>
            ))
          ) : (
            <p className="mb-6 text-xs leading-6 text-muted">
              More video teachings will appear here when published.
            </p>
          )}
          <Link className="textlink" href="/teachings?format=read">
            Prefer to read? Explore articles ↗
          </Link>
        </aside>
      </div>
    </div>
  );
}
