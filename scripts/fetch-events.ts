import fs from "fs";
import path from "path";

interface RawEvent {
  title?: string;
  description?: string;
  location?: string;
  startDateTime?: string;
  endDateTime?: string;
  dateTimeFormatted?: string;
  permaLinkUrl?: string;
  categoryCalendar?: string;
  canceled?: boolean;
  customFields?: { label: string; value: string }[];
}

async function main() {
  const url = "https://www.fullerton.edu/web/core/events/current-events.json";
  const outPath = path.resolve(__dirname, "../src/data/events.json");

  console.log(`Fetching events from ${url} ...`);

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const data = await res.json();
  const raw: RawEvent[] = Array.isArray(data) ? data : data.events || [];

  const events = raw
    .filter((e) => e.title && !e.canceled)
    .map((e) => {
      // Try to extract organization from customFields
      const org = e.customFields?.find((f) => f.label === "Organization")?.value || "";

      return {
        title: e.title || "",
        location: e.location || org || "",
        datetime: e.startDateTime || "",
        endDatetime: e.endDateTime || "",
        dateFormatted: (e.dateTimeFormatted || "").replace(/&nbsp;/g, " ").replace(/&ndash;/g, "–"),
        description: e.description || "",
        permalink: e.permaLinkUrl || "",
        category: e.categoryCalendar || "",
      };
    });

  fs.writeFileSync(outPath, JSON.stringify(events, null, 2));

  const sizeKB = (Buffer.byteLength(JSON.stringify(events)) / 1024).toFixed(1);
  console.log(`Wrote ${events.length} events to src/data/events.json (${sizeKB} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
