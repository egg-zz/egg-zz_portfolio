import type { EggEntry } from "../model/types";

const STORAGE_KEY = "egg-tray:entries";

type StoredEntries = Record<string, EggEntry>;

function entryKey(monthKey: string, day: number): string {
  return `${monthKey}:${day}`;
}

function readAll(): StoredEntries {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredEntries) : {};
  } catch {
    return {};
  }
}

export function getStoredEntriesForMonth(monthKey: string): Record<number, EggEntry> {
  const prefix = `${monthKey}:`;
  const result: Record<number, EggEntry> = {};
  for (const [key, entry] of Object.entries(readAll())) {
    if (key.startsWith(prefix)) {
      result[Number(key.slice(prefix.length))] = entry;
    }
  }
  return result;
}

export function saveStoredEntry(monthKey: string, day: number, entry: EggEntry): void {
  if (typeof window === "undefined") return;
  const all = readAll();
  all[entryKey(monthKey, day)] = entry;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
