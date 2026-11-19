// Demo bookings are offered in Sydney business hours, regardless of where the
// visitor's browser is. These helpers convert between a Sydney wall-clock time
// and an absolute instant, handling the AEST (+10) / AEDT (+11) switch.

export const SYDNEY_TZ = "Australia/Sydney";

const pad = (n: number) => String(n).padStart(2, "0");

/** Sydney UTC offset in minutes at a given instant (600 = AEST, 660 = AEDT). */
function offsetAt(instant: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SYDNEY_TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - instant.getTime()) / 60000);
}

/** Today's date in Sydney as { year, month (0-based), day }. */
export function sydneyToday(now = new Date()) {
  const d = new Date(now.getTime() + offsetAt(now) * 60000);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth(), day: d.getUTCDate() };
}

/**
 * ISO 8601 string with an explicit offset for a Sydney wall-clock time,
 * e.g. sydneyIso(2026, 10, 20, 9, 0) → "2026-11-20T09:00+11:00".
 */
export function sydneyIso(year: number, month: number, day: number, hour: number, minute: number): string {
  const wallAsUtc = Date.UTC(year, month, day, hour, minute);
  // Two passes settle the offset correctly either side of a DST transition.
  let offset = offsetAt(new Date(wallAsUtc - 600 * 60000));
  offset = offsetAt(new Date(wallAsUtc - offset * 60000));
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/** "AEDT" or "AEST" for an ISO string produced by sydneyIso(). */
export function sydneyAbbrev(iso: string): "AEDT" | "AEST" {
  return iso.endsWith("+11:00") ? "AEDT" : "AEST";
}

/** Human-readable Sydney date/time parts for an ISO string from sydneyIso(). */
export function formatSydney(iso: string) {
  const instant = new Date(iso);
  const date = instant.toLocaleDateString("en-AU", {
    timeZone: SYDNEY_TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const longDate = instant.toLocaleDateString("en-AU", {
    timeZone: SYDNEY_TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = instant
    .toLocaleTimeString("en-AU", { timeZone: SYDNEY_TZ, hour: "numeric", minute: "2-digit", hour12: true })
    .toUpperCase();
  const abbrev = sydneyAbbrev(iso);
  return { date, longDate, time, abbrev, label: `${longDate}, ${time} ${abbrev} (Sydney time)` };
}

/** UTC basic format for calendar links, e.g. "20261119T220000Z". */
export function toUtcBasic(instant: Date): string {
  return instant.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
