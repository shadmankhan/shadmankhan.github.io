"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Command, House, List, Moon, MagnifyingGlass, Sun, X } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { rooms } from "@/content/rooms";
import { profile } from "@/content/public-profile";
import { usePersistentBoolean } from "@/lib/preferences";

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();
  const filtered = useMemo(() => rooms.filter((room) => `${room.title} ${room.short} ${room.label}`.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    if (open) window.setTimeout(() => input.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const goHome = query.toLowerCase().includes("home") || query.toLowerCase().includes("world");
  return <AnimatePresence>
    {open && <motion.div className="palette-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .16 }}>
      <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Explore Shadman's world" initial={reduceMotion ? false : { y: -12, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: .99 }}>
        <div className="palette-search"><MagnifyingGlass size={18} aria-hidden="true" /><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where shall we go? Try ‘music’ or ‘games’…" aria-label="MagnifyingGlass rooms" /></div>
        <div className="palette-results">
          {goHome && <Link href="/" onClick={onClose}><span>My world</span><small>Front door</small></Link>}
          {filtered.map((room) => <Link key={room.slug} href={`/${room.slug}`} onClick={onClose}><span>{room.title}</span><small>{room.short}</small></Link>)}
          {filtered.length === 0 && !goHome && <p className="muted" style={{ padding: "12px 14px", margin: 0, fontSize: 13 }}>No room by that name yet. Try “studio” or “journeys”.</p>}
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [palette, setPalette] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [night, setNight] = usePersistentBoolean("little-home-theme", "night", "day");
  const openPalette = useCallback(() => setPalette(true), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPalette((current) => !current); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = (slug: string) => pathname === `/${slug}` ? { "aria-current": "page" as const } : {};

  return <div id="site-shell" data-room={pathname === "/" ? "home" : pathname.slice(1)} className={night ? "site-shell night-mode" : "site-shell"}>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Shadman, home">
          <span className="brand-mark"><House size={19} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>Shadman</strong><small>MY WORLD, MY WORK</small></span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/studio" {...current("studio")}>Work</Link>
          <Link href="/music" {...current("music")}>Music</Link>
          <Link href="/arcade" {...current("arcade")}>Games</Link>
          <Link href="/about" {...current("about")}>About</Link>
        </nav>
        <div className="header-actions">
          <button className="palette-button" onClick={() => setPalette((current) => !current)} aria-label="Explore rooms" aria-haspopup="dialog" aria-expanded={palette}><MagnifyingGlass size={15} /> <span>Explore rooms</span><kbd><Command size={11} /> K</kbd></button>
          <a className="header-contact" href={`mailto:${profile.email}?subject=Hello%20Shadman`}>Say hello <ArrowUpRight size={14} /></a>
          <button className="icon-button theme-button" onClick={() => setNight(!night)} aria-label={night ? "Switch to daytime" : "Switch to evening"} title={night ? "Daylight" : "Evening"}>{night ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="menu-button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={18} /> : <List size={18} />}</button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {mobileOpen && <motion.nav className="mobile-nav open" aria-label="Room navigation" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2, ease: "easeOut" }}>
          <div className="mobile-room-grid">
            <Link href="/" onClick={() => setMobileOpen(false)}><House size={15} /> My world</Link>
            {rooms.map((room) => { const Icon = room.icon; return <Link href={`/${room.slug}`} key={room.slug} onClick={() => setMobileOpen(false)}><Icon size={15} /> {room.label}</Link>; })}
          </div>
          <button className="palette-button mobile-search" onClick={openPalette}><MagnifyingGlass size={15} /> Find a room</button>
        </motion.nav>}
      </AnimatePresence>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer world-footer"><div className="content-width footer-inner"><span>Made with curiosity, code, and warm light in the windows. © 2026 Shadman.</span><div className="footer-links"><Link href="/">Front door</Link><Link href="/studio">Work</Link><a href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={12} /></a></div></div></footer>
    <CommandPalette open={palette} onClose={() => setPalette(false)} />
  </div>;
}
