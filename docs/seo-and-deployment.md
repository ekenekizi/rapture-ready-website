# SEO and deployment configuration

Set this server-only environment variable in `.env.local` and in the hosting provider:

```dotenv
SITE_URL=https://www.endtimewatch.org
```

The default comes from the ministry address printed in the supplied ebook. Change it
if the deployed website uses another canonical domain. Restart locally after an
environment change; redeploy when changing it on the host. Choose one HTTPS domain
and configure the host to redirect alternative domains to it.

Every public page has its own canonical URL, description, Open Graph tags, and X
(Twitter) card. Teaching previews use the uploaded Sanity cover photo, or the
ministry graphic when no photo is provided. The default graphic is generated from
`public/social-preview.svg` as `public/social-preview.png`; it is a static asset,
so sharing does not depend on a remote image-generation service.

`/sitemap.xml` lists public marketing pages, book sections, and visible published
teachings. It uses the same teachings cache tag as the publishing webhook, so
publishing or unpublishing also refreshes sitemap results. `/robots.txt` points to
the sitemap. Studio retains Sanity's noindex metadata and is excluded from the
sitemap. API paths are excluded too. Robots rules are crawler instructions, not
access controls.

After deployment, submit the sitemap URL to Google Search Console and check a
teaching URL in the social platforms' preview tools. Platforms may retain old
preview images until their cache is refreshed. Production-only checks require a
public URL; localhost share links cannot be fetched by those services.

Optional website settings have a short-lived fallback that revalidates after five
seconds and expires after thirty seconds. A failed
Sanity request is logged on the server and does not prevent metadata or the
footer from rendering. Actual teaching/gallery query errors are still errors;
they are not silently turned into empty content. The teaching error button uses
Next.js `retry()` to refetch its server-rendered segment.

## Dependency security fixes

Next.js and eslint-config-next are pinned to 16.4.1. The existing Sanity version
and the intentional @sanity/ui 4.3.1 pin are preserved.

`package.json` contains scoped npm overrides for patched transitive dependencies:
js-yaml 3.15.2, smol-toml 1.9.1, and undici 7.30.1 stay within their existing major
versions. typeid-js uses only UUID's stringify API; its override uses UUID 11.1.1,
which retains that API and CommonJS support. Identifier creation and round trips
are checked after installation. These overrides avoid the unrelated major
Sanity downgrade suggested by npm's automatic audit fix. Reassess them when
upstream Sanity packages adopt the fixes.

## Verification limit in this environment

The code passed TypeScript, ESLint, dependency auditing, targeted regression
checks, Sanity schema validation, and local HTTP checks for metadata, sitemap,
robots, the preview image, and missing articles. Production compilation passed,
but static page generation repeatedly hit a Windows EPERM while creating a
generated output directory. Re-run npm run build from your terminal before
deployment; a complete production build is not yet verified in this environment.
