import "server-only";

import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "published",
  useCdn: false,
});
