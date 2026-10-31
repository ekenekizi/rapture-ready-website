# Managing Endtime Watch content

Start the website with `npm run dev`, then open `/studio` on your local website.
Use your existing Sanity account and project; no new project or visitor accounts are needed.

## Website settings, Homepage, and About the ministry

These are single documents, opened directly from the Studio content list. You do
not need to create multiple copies.

- **Website settings** controls the footer description, slogan, search-engine
  description, optional contact email, and Facebook, TikTok, and X profile links.
  Leave missing links blank; no placeholder profiles are displayed.
- **Homepage** controls the hero wording and scripture, mission and pillars,
  Endtime/Rapture explanation, large scripture feature, About preview, and final
  invitation. Use line breaks in the headline to keep the editorial stacked layout.
  The hero headline and supporting message are required. Optional sections can be
  left out until approved text is available.
- **About the ministry** controls the About page heading, introduction, story
  heading, and paragraphs. Add each paragraph as a separate entry.

Enter real, approved ministry information and click **Publish**. Until these
documents are published, the site displays information-coming-soon messages.
The existing ebook remains available. Section labels, navigation, and the approved
watchtower illustration remain part of the design.

## Hero and About images

- **Homepage → Hero introduction → Hero image:** upload the optional hero image, enter its alt text, and adjust crop/hotspot. Leave it empty to keep the watchtower illustration. Hero image caption remains available; if empty, the uploaded image’s caption is used.
- **About the ministry → About ministry image:** upload the optional About image. The same image appears on the About page and the homepage About preview. Leave it empty to keep the About page’s existing arch illustration and the homepage’s existing text layout.
- Removing an optional image restores its default presentation. Publish the relevant document after changing or removing an image. Existing image optimisation and the ministry-pages cache/webhook apply.

## Written and video teachings

Open **Teaching** in Studio. Choose **Written article** or **Video teaching** in Teaching format. Existing articles without this field are still treated as written articles; select Written article when editing an older entry.

### Written article

Enter the title, generate the URL slug, select a category, write the Short introduction, enter the main Scripture reference and reading time, and complete Teaching content. Cover photos and content photos remain supported. Publish when ready.

### Video teaching

1. Choose **Video teaching**, enter a title, generate its URL slug, select a category, and add the Short introduction. This introduction is also the short description beneath the player.
2. Upload a **Cover photo / video thumbnail**, with alt text and a suitable crop.
3. Upload the **Video file (MP4)**. Export it with H.264 video and AAC audio for browser compatibility. The file is played directly; the website does not transcode it or create adaptive streaming qualities. Optimise large phone recordings before uploading.
4. Enter **Video duration in seconds** (for example 272 for 4:32). Optionally change Video label from Short teaching to Biblical reflection.
5. Enter Main scripture reference; optionally add Scripture quotation and reflection prompts under Reflect & respond.
6. Optionally upload WebVTT (.vtt) captions and set the captions language (en for English). Teaching content can hold additional notes or a transcript; it is optional for video entries.
7. Set the publication date and leave Show on the website enabled, then publish.

The Teachings page has All teachings, Read, and Watch filters. Each video uses its own /teachings/your-slug page, including social sharing and thumbnail metadata. The latest published video appears in the homepage’s Pause. Watch. Reflect. feature. The Biblical Perspectives homepage section continues to display written articles; the duplicate Latest Teachings section has been removed.

Videos require a valid published MP4 asset to appear publicly. Drafts, hidden entries, and video entries without a supported asset are not listed. The website deliberately has no demonstration videos: the Watch filter and homepage video feature show coming-soon messages until actual videos are published.

The player has native playback controls, works inline on phones, does not autoplay, and does not preload the video file. Captions appear through the player controls when supplied. Uploading media to Sanity does not guarantee its encoding is browser-compatible; test the first published video on a phone before launch.

Turn off Show on the website and publish, or unpublish, to remove either format. Both formats use the existing teachings cache tag and webhook; no additional webhook configuration is needed. Shared video files are public media assets, not protected streaming.

## Bible Prophecy Photos gallery

Open **Gallery photo study** in Studio. Each document is one image with a Scripture-first study.

1. **Overview:** enter the study title, generate its sharing URL slug, select a topic, write a short introduction, and set the reading time.
2. **Image & context:** upload the image, enter alt text and credit, and adjust crop/hotspot. Choose Photograph, Symbolic illustration / artwork, or Origin not verified. Write the context/provenance note and optionally link the original source. Enable the conceal control for graphic imagery.
3. **Scripture & study:** add one or more Scripture quotations and references (include translation and label excerpts), describe what is visible, add the biblical reflection heading and text, then add reflection/prayer prompts under Reflect & respond. Newlines in the explanation and reflection are preserved.
4. **Publishing:** set display order (smaller numbers first), choose whether to feature it on the homepage, leave Show on the website enabled, and publish.

The first three featured studies appear on the homepage. The cards and open study both have sharing controls. Copy Link opens the exact study in the gallery using a stable fragment such as /gallery#study=your-slug. Keep the slug unchanged once shared. Social platforms use the gallery page’s shared preview metadata; individual study social-preview images would need separate server-rendered study URLs.

Existing gallery documents are preserved: the internal document type remains galleryPhoto. Open each old entry, replace the activity category with a new topic, generate the slug, and complete the study fields. Until then its document ID works as a fallback share identifier, its caption supplies the short introduction, and missing study sections show coming-soon messages. Changing a fallback ID to a generated slug changes that share link; set the slug before circulating it.

Drafts and hidden entries never appear publicly. Use Show on the website or unpublish to remove an entry from the website. There are no stock/sample entries in the real project: an empty collection shows a coming-soon message. Review image permissions and factual context before publication; the schema does not verify them automatically.

## Updates and caching

The website caches ministry pages, settings, teaching and gallery results, with revalidation after 60 seconds
when they are requested. After publishing, allow about a minute and refresh; a
second refresh may be needed while cached content refreshes in the background.
For prompt updates after publishing or unpublishing, the website now includes a
signed webhook endpoint. Follow [the webhook setup guide](sanity-webhook.md) to
configure the shared secret and enable delivery in Sanity. Once enabled, the next
visit or reload after delivery uses fresh content. Already open tabs need a reload.

## Current scope

- Teachings, teaching photos, and gallery photos are connected to Sanity.
- Homepage gallery photos come from the same gallery collection.
- Ministry marketing copy, footer copy, and owner social-profile links come from
  the Homepage, About the ministry, and Website settings documents.
- The ebook text remains local; reading progress and highlights remain in the browser.
- No Join Us form is included.
- Public reads do not require an API write token. Studio controls content editing.

## Sharing gallery studies

Each study has a shareable /gallery/SLUG page with its published Sanity title, description, and uploaded image in Open Graph and X metadata. Gallery cards and share buttons use these URLs; existing /gallery#study=SLUG links still open the original modal. The shared page and the modal use the same study content.

The Title field controls both the study heading and share title. Change placeholder titles in Studio and publish; changing the title does not require changing the slug. Social platforms cache previews, so previously sent messages may keep their old previews after publication or deployment. Share the new study URL to test.
