"use client";

import { useMemo, useSyncExternalStore } from "react";

export type ReaderSettings = {
  fontSize: number;
  lineHeight: number;
  width: "comfortable" | "wide";
  theme: "light" | "sepia" | "dark";
};

export type ReaderState = {
  lastSectionId: string | null;
  completedSectionIds: string[];
  settings: ReaderSettings;
  temporaryOnly: boolean;
};

const storageKey = "endtime-watch:rapture-ready:reader:v1";
const eventName = "endtime-watch:reader-updated";

let memorySnapshot: string | null = null;

const defaults: ReaderState = {
  lastSectionId: null,
  completedSectionIds: [],
  settings: {
    fontSize: 20,
    lineHeight: 1.9,
    width: "comfortable",
    theme: "light",
  },
  temporaryOnly: false,
};

function parseState(raw: string): ReaderState {
  try {
    const value: unknown = JSON.parse(raw);

    if (!value || typeof value !== "object") {
      return defaults;
    }

    const state = value as Partial<ReaderState>;

    const settings =
      state.settings && typeof state.settings === "object"
        ? state.settings
        : defaults.settings;

    return {
      lastSectionId:
        typeof state.lastSectionId === "string" ? state.lastSectionId : null,

      completedSectionIds: Array.isArray(state.completedSectionIds)
        ? [
            ...new Set(
              state.completedSectionIds.filter((id) => typeof id === "string"),
            ),
          ]
        : [],

      settings: {
        fontSize: [18, 20, 22, 24].includes(settings.fontSize)
          ? settings.fontSize
          : 20,

        lineHeight: [1.7, 1.9, 2.1].includes(settings.lineHeight)
          ? settings.lineHeight
          : 1.9,

        width: settings.width === "wide" ? "wide" : "comfortable",

        theme:
          settings.theme === "dark" || settings.theme === "sepia"
            ? settings.theme
            : "light",
      },

      temporaryOnly: state.temporaryOnly === true,
    };
  } catch {
    return defaults;
  }
}

function getSnapshot(): string {
  if (memorySnapshot !== null) {
    return memorySnapshot;
  }

  try {
    return window.localStorage.getItem(storageKey) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return "";
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      memorySnapshot = null;
      listener();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(eventName, listener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(eventName, listener);
  };
}

export function useReaderState(): ReaderState {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => parseState(raw), [raw]);
}

export function updateReaderState(
  update: (current: ReaderState) => ReaderState,
) {
  const previousRaw = getSnapshot();
  const current = parseState(previousRaw);

  const next = {
    ...update(current),
    temporaryOnly: false,
  };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    next.temporaryOnly = true;
  }

  const raw = JSON.stringify(next);

  if (raw === previousRaw) {
    return;
  }

  memorySnapshot = raw;
  window.dispatchEvent(new Event(eventName));
}
