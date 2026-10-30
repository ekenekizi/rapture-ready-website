"use client";

import { defineConfig, defineSingleton } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "endtime-watch",
  title: "Endtime Watch",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool()],
  document: {
    singletons: [
      defineSingleton({
        schemaType: "siteSettings",
        documentId: "site-settings",
        title: "Website settings",
      }),
      defineSingleton({
        schemaType: "homePage",
        documentId: "home-page",
        title: "Homepage",
      }),
      defineSingleton({
        schemaType: "aboutPage",
        documentId: "about-page",
        title: "About the ministry",
      }),
    ],
  },

  schema: {
    types: schemaTypes,
  },
});
