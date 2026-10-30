"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react/ssr";

type Day = { date: string; level: number };
type CalendarResponse = { days?: Day[] };

export function GitHubGarden() {
  const [days, setDays] = useState<Day[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github-contributions", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Contribution calendar unavailable");
        return response.json() as Promise<CalendarResponse>;
      })
      .then((data) => {
        if (!data.days?.length) throw new Error("No public contribution days returned");
        setDays(data.days);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("unavailable");
      });
    return () => controller.abort();
  }, []);

  const calendar = useMemo(() => {
    if (!days.length) return null;
    const firstDate = new Date(`${days[0].date}T00:00:00Z`);
    const leadingCells = firstDate.getUTCDay();
    const cells: Array<Day | null> = [...Array.from({ length: leadingCells }, () => null), ...days];
    const weeks = Math.ceil(cells.length / 7);
    const months = days.flatMap((day, index) => {
      if (new Date(`${day.date}T00:00:00Z`).getUTCDate() !== 1) return [];
      return [{ label: new Date(`${day.date}T00:00:00Z`).toLocaleString("en", { month: "short", timeZone: "UTC" }), column: Math.floor((index + leadingCells) / 7) + 1 }];
    });
    return { cells, weeks, months };
  }, [days]);

  return (
    <div className="github-garden">
      <div className="github-garden-heading">
        <div><span className="eyebrow">THE REAL CONTRIBUTION GARDEN</span><h2 className="display">A year of little squares.</h2><p>Today’s public contribution grid, pulled from GitHub. No made-up streaks or totals.</p></div>
        <a className="github-garden-link" href="https://github.com/shadmankhan" target="_blank" rel="noreferrer"><GithubLogo size={17} weight="fill" /> Open GitHub <ArrowSquareOut size={13} /></a>
      </div>

      <div className={`github-garden-frame${status === "ready" ? " is-ready" : ""}`}>
        {status === "loading" && <div className="github-garden-loading" aria-label="Loading GitHub contribution grid"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>}
        {status === "unavailable" && <div className="github-garden-empty" role="status"><span>The garden couldn’t reach GitHub just now.</span><a href="https://github.com/shadmankhan" target="_blank" rel="noreferrer">See the live profile instead <ArrowSquareOut size={13} /></a></div>}
        {status === "ready" && calendar && (
          <div className="github-garden-scroll" tabIndex={0} aria-label="Scrollable public contribution calendar">
            <div className="github-calendar" role="img" aria-label="GitHub public contribution levels across the last year">
              <div className="github-months" style={{ gridTemplateColumns: `repeat(${calendar.weeks}, 10px)` }} aria-hidden="true">
                {calendar.months.map((month, index) => <span key={`${month.label}-${index}`} style={{ gridColumnStart: month.column }}>{month.label}</span>)}
              </div>
              <div className="github-days" style={{ gridTemplateColumns: `repeat(${calendar.weeks}, 10px)` }} aria-hidden="true">
                {calendar.cells.map((day, index) => <i key={day?.date ?? `blank-${index}`} className={day ? `contribution-day level-${day.level}` : "contribution-day is-empty"} title={day ? new Date(`${day.date}T00:00:00Z`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : undefined} />)}
              </div>
              <div className="github-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
            </div>
          </div>
        )}
      </div>
      <div className="github-garden-foot"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i className={`contribution-day level-${level}`} key={level} aria-hidden="true" />)}<span>More</span><span className="github-garden-note">GitHub may omit activity that isn’t public or linked to the account.</span></div>
    </div>
  );
}
