"use client";

import { useMemo, useSyncExternalStore } from "react";
import { isHighlight, type BookHighlight } from "@/lib/highlights";

type HighlightState = {
  items: BookHighlight[];
  temporaryOnly: boolean;
};

const key = "endtime-watch:rapture-ready:highlights:v1";
const changedEvent = "endtime-watch:highlights-updated";

let memory: string | null = null;

function parse(raw: string): HighlightState {
  try {
    const value: unknown = JSON.parse(raw);

    if (!value || typeof value !== "object") {
      return { items: [], temporaryOnly: false };
    }

    const state = value as Partial<HighlightState>;

    return {
      items: Array.isArray(state.items) ? state.items.filter(isHighlight) : [],
      temporaryOnly: state.temporaryOnly === true,
    };
  } catch {
    return { items: [], temporaryOnly: false };
  }
}

function snapshot(): string {
  if (memory !== null) return memory;

  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function serverSnapshot(): string {
  return "";
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      memory = null;
      listener();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(changedEvent, listener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changedEvent, listener);
  };
}

export function useHighlights(): HighlightState {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  return useMemo(() => parse(raw), [raw]);
}

function update(change: (items: BookHighlight[]) => BookHighlight[]) {
  const state: HighlightState = {
    items: change(parse(snapshot()).items),
    temporaryOnly: false,
  };

  try {
    window.localStorage.setItem(key, JSON.stringify(state));
  } catch {
    state.temporaryOnly = true;
  }

  memory = JSON.stringify(state);
  window.dispatchEvent(new Event(changedEvent));
}

export function addHighlight(item: BookHighlight) {
  if (!isHighlight(item)) return;

  update((items) => {
    const duplicate = items.some(
      (existing) =>
        existing.sectionId === item.sectionId &&
        JSON.stringify(existing.segments) === JSON.stringify(item.segments),
    );

    return duplicate ? items : [item, ...items];
  });
}

export function removeHighlight(id: string) {
  update((items) => items.filter((item) => item.id !== id));
}
