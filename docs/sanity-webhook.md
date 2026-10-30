# Sanity publishing webhook

The endpoint is `POST /api/revalidate`. It validates Sanity's signed request,
then expires the relevant Next.js cache tag. No API write token is needed.

## 1. Configure the secret

Generate a random secret in your terminal:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Add the result to `.env.local` (do not commit or share the value):

```dotenv
SANITY_REVALIDATE_SECRET=your-generated-secret
```

Also add this server-only variable to your hosting provider's environment
variables and redeploy. Do not prefix it with `NEXT_PUBLIC_`.
Restart the local development server after changing `.env.local`.

## 2. Create the Sanity webhook

Open [Sanity Manage](https://www.sanity.io/manage), select the existing project,
then go to **API → Webhooks → Create webhook**.

- Name: `Endtime Watch content refresh`
- URL: `https://YOUR-WEBSITE-DOMAIN/api/revalidate`
- Dataset: the same dataset configured for the website
- Trigger on: **Create, Update, Delete** (Delete also covers unpublishing)
- HTTP method: **POST**
- Secret: the exact value of `SANITY_REVALIDATE_SECRET`
- Keep draft and version events disabled; enable the webhook

Filter:

```groq
coalesce(after()._type, before()._type) in ["teaching", "galleryPhoto", "homePage", "aboutPage", "siteSettings"]
&& !(coalesce(after()._id, before()._id) in path("drafts.**"))
&& !(coalesce(after()._id, before()._id) in path("versions.**"))
```

Projection:

```groq
{
  "_id": coalesce(after()._id, before()._id),
  "_type": coalesce(after()._type, before()._type)
}
```

Using `before()` as a fallback preserves the document type and ID on deletion.
Do not filter by visibility, title or slug: hiding a document must also refresh
the website so the old version disappears.

Sanity needs a publicly reachable URL. It cannot reach `localhost` or
`127.0.0.1` on your computer. Configure the deployed domain when it is available;
a temporary HTTPS tunnel is an optional way to test locally.

## 3. Verify delivery

1. Publish a small approved change in Studio.
2. Check the webhook's delivery/attempt log in Sanity. A successful request
   returns HTTP 200 with `revalidated: true` and the affected tag.
3. Reload the affected website page after delivery succeeds. Check that the
   updated content appears. Also test unpublishing an expendable test document.

The helper waits about three seconds for Sanity's content to become queryable.
The next page request then loads fresh data; there is no rebuild or deploy per
publication. Existing open tabs do not update automatically: reload to see it.
The existing 60-second cache revalidation remains a fallback if delivery fails.

Responses: 503 means the server secret is missing; 401 means the signature is
missing or incorrect; 400 means the request/signature format or payload is invalid.
Sanity can retry failed deliveries; expiring a tag repeatedly is safe.

## How the code works

`app/api/revalidate/route.ts` is a backend route, not a page. `parseBody` from
the already installed `next-sanity` checks the signature against the secret.
The document type is mapped to an existing `cacheTag`: teachings, gallery,
ministry-pages, or site-settings. `revalidateTag(tag, { expire: 0 })` expires
cached queries shared by all pages using that content, including homepage previews.
It never accepts an arbitrary tag or path supplied by the caller.

References: [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks),
[Sanity Next.js integration](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs).
