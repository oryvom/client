"use client";

import { Button } from "@/components/ui/button";
import Script from "next/script";
import { useState, useSyncExternalStore } from "react";

type Preferences = {
  analytics: boolean;
  decided: boolean;
};

const storageKey = "oryvom-cookie-preferences";
const emptyPreferences: Preferences = { analytics: false, decided: false };
let cachedRaw: string | null = null;
let cachedPreferences: Preferences = emptyPreferences;

function parsePreferences(raw: string | null): Preferences {
  if (!raw) return emptyPreferences;
  try {
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return { analytics: Boolean(parsed.analytics), decided: true };
  } catch {
    return emptyPreferences;
  }
}

function readPreferences(): Preferences {
  const raw = window.localStorage.getItem(storageKey);
  if (raw === cachedRaw) return cachedPreferences;
  cachedRaw = raw;
  cachedPreferences = parsePreferences(raw);
  return cachedPreferences;
}

function writePreferences(analytics: boolean) {
  const value = JSON.stringify({ analytics, decided: true });
  window.localStorage.setItem(storageKey, value);
  cachedRaw = value;
  cachedPreferences = { analytics, decided: true };
  window.dispatchEvent(new Event("oryvom-cookie-preferences"));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("oryvom-cookie-preferences", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("oryvom-cookie-preferences", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot() {
  return emptyPreferences;
}

export function CookiePreferences() {
  const stored = useSyncExternalStore(subscribe, readPreferences, getServerSnapshot);
  const [draft, setDraft] = useState<boolean | null>(null);
  const analytics = draft ?? stored.analytics;
  const analyticsConfigured = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  const [saved, setSaved] = useState(false);

  function save(next: boolean) {
    writePreferences(next);
    setDraft(null);
    setSaved(true);
  }

  return (
    <div className="mt-8 border border-line bg-paper p-6">
      <h2 className="text-xl text-navy">Cookie preferences</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {analyticsConfigured
          ? "Optional analytics is configured for this website. It loads only after you allow it."
          : "Optional analytics is not enabled on this website. A choice saved here will be applied if analytics is introduced later. No advertising cookies are set."}
      </p>
      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-navy">Customize</legend>
        <label className="mt-3 flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-1"
            checked={analytics}
            onChange={(event) => {
              setDraft(event.target.checked);
              setSaved(false);
            }}
          />
          <span>Allow analytics cookies, if an analytics service is configured.</span>
        </label>
      </fieldset>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button type="button" className="h-11 rounded-sm px-4" onClick={() => save(true)}>
          Accept all
        </Button>
        <Button type="button" variant="outline" className="h-11 rounded-sm px-4" onClick={() => save(false)}>
          Reject non-essential
        </Button>
        <Button type="button" variant="secondary" className="h-11 rounded-sm px-4" onClick={() => save(analytics)}>
          Save preferences
        </Button>
      </div>
      {saved ? (
        <p role="status" className="mt-4 text-sm text-navy">
          Your preference has been saved in this browser.
        </p>
      ) : null}
    </div>
  );
}

export function CookieBanner() {
  const analyticsConfigured = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  const stored = useSyncExternalStore(subscribe, readPreferences, getServerSnapshot);
  if (!analyticsConfigured || stored.decided) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          This website can use optional analytics cookies. They are off until you choose.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" className="h-10 rounded-sm px-4" onClick={() => writePreferences(true)}>
            Accept all
          </Button>
          <Button type="button" variant="outline" className="h-10 rounded-sm px-4" onClick={() => writePreferences(false)}>
            Reject non-essential
          </Button>
          <Button asChild variant="secondary" className="h-10 rounded-sm px-4">
            <a href="/cookie-policy">Customize</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsGate() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  const stored = useSyncExternalStore(subscribe, readPreferences, getServerSnapshot);
  if (!src || !stored.analytics) return null;
  return <Script src={src} strategy="afterInteractive" />;
}
