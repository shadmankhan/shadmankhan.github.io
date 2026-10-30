type ContributionDay = { date: string; level: number };

const dayTagPattern = /<td\b([^>]*)>/g;
const datePattern = /\bdata-date="(\d{4}-\d{2}-\d{2})"/;
const levelPattern = /\bdata-level="([0-4])"/;

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const since = new Date(`${today}T00:00:00Z`);
    since.setUTCDate(since.getUTCDate() - 364);
    const from = since.toISOString().slice(0, 10);
    const response = await fetch(`https://github.com/users/shadmankhan/contributions?from=${from}&to=${today}`, {
      headers: {
        Accept: "text/html",
        "User-Agent": "ShadmanPortfolio/1.0 (public contribution calendar)",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return Response.json({ days: [] }, { status: 502, headers: { "Cache-Control": "public, s-maxage=900" } });
    }

    const fragment = await response.text();
    const days = new Map<string, ContributionDay>();
    for (const match of fragment.matchAll(dayTagPattern)) {
      const date = match[1].match(datePattern)?.[1];
      const level = match[1].match(levelPattern)?.[1];
      if (date && level && date >= from && date <= today) days.set(date, { date, level: Number(level) });
    }
    const sortedDays = [...days.values()].sort((a, b) => a.date.localeCompare(b.date));

    return Response.json(
      { days: sortedDays },
      { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=604800" } },
    );
  } catch {
    return Response.json({ days: [] }, { status: 502, headers: { "Cache-Control": "public, s-maxage=900" } });
  }
}
