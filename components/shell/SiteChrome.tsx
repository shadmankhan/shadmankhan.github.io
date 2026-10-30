"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Command, Menu, Moon, Search, Sun, Volume2, VolumeX, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { rooms } from "@/content/rooms";

function softChime() {
  try {
    const AudioContextClass = window.AudioContext;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 520;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.15);
    oscillator.onended = () => void ctx.close();
  } catch { /* Audio is an optional enhancement; the site remains silent. */ }
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const filtered = useMemo(() => rooms.filter((room) => `${room.title} ${room.short} ${room.label}`.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    if (open) { setQuery(""); window.setTimeout(() => input.current?.focus(), 60); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const goHome = query.toLowerCase().includes("home");
  return <AnimatePresence>
    {open && <motion.div className="palette-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .16 }}>
      <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Find something" initial={reduceMotion ? false : { y: -12, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: .99 }}>
        <div style={{ position: "relative" }}><Search size={18} style={{ position: "absolute", left: 20, top: 21, color: "#8b8175" }} /><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where shall we go? Try ‘music’ or ‘games’…" aria-label="Search rooms" /></div>
        <div className="palette-results">
          {goHome && <Link href="/" onClick={onClose}><span>Welcome home</span><small>Front door</small></Link>}
          {filtered.map((room) => <Link key={room.slug} href={`/${room.slug}`} onClick={onClose}><span>{room.title}</span><small>{room.short}</small></Link>)}
          {filtered.length === 0 && !goHome && <p className="muted" style={{ padding: "12px 14px", margin: 0, fontSize: 13 }}>No room by that name yet. Try “studio” or “journeys”.</p>}
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [palette, setPalette] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [night, setNight] = useState(false);
  const [sound, setSound] = useState(false);
  const [ready, setReady] = useState(false);
  const openPalette = useCallback(() => setPalette(true), []);

  useEffect(() => {
    setNight(localStorage.getItem("little-home-theme") === "night");
    setSound(localStorage.getItem("little-home-sound") === "on");
    setReady(true);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPalette((current) => !current); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleNight = () => { const next = !night; setNight(next); localStorage.setItem("little-home-theme", next ? "night" : "day"); };
  const toggleSound = () => { const next = !sound; setSound(next); localStorage.setItem("little-home-sound", next ? "on" : "off"); if (next) softChime(); };
  const current = (slug: string) => pathname === `/${slug}` ? { "aria-current": "page" as const } : {};

  return <div id="site-shell" className={ready && night ? "night-mode" : ""}>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Shadman's Little Corner, home"><span className="brand-mark">s</span><span>/home/shadman</span></Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/studio" {...current("studio")}>Studio</Link><Link href="/arcade" {...current("arcade")}>Arcade</Link><Link href="/music" {...current("music")}>Music</Link><Link href="/library" {...current("library")}>Library</Link><Link href="/journeys" {...current("journeys")}>Journeys</Link><Link href="/garage" {...current("garage")}>Garage</Link><Link href="/garden" {...current("garden")}>Garden</Link><Link href="/about" {...current("about")}>About</Link>
        </nav>
        <div className="header-actions">
          <button className="palette-button" onClick={openPalette} aria-label="Find something"><Command size={14} /> Find something <kbd>⌘ K</kbd></button>
          <button className="icon-button" onClick={toggleSound} aria-label={sound ? "Turn sound off" : "Turn sound on"} title={sound ? "Sound on" : "Sound off"}>{sound ? <Volume2 size={17} /> : <VolumeX size={17} />}</button>
          <button className="icon-button" onClick={toggleNight} aria-label={night ? "Switch to daytime" : "Switch to evening"} title={night ? "Daylight" : "Evening"}>{night ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="menu-button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <nav className={`mobile-nav${mobileOpen ? " open" : ""}`} aria-label="Room navigation">
        <Link href="/">Home</Link>{rooms.map((room) => <Link key={room.slug} href={`/${room.slug}`}>{room.label}</Link>)}
        <button className="palette-button" style={{ display: "flex" }} onClick={openPalette}><Search size={14} /> Find something</button>
      </nav>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="content-width footer-inner"><span>Made slowly, with a little room to breathe. © {new Date().getFullYear()} Shadman.</span><div className="footer-links"><Link href="/">Home</Link><a href="mailto:contactshadman@gmail.com">Say hello <ArrowUpRight size={12} /></a></div></div></footer>
    <CommandPalette open={palette} onClose={() => setPalette(false)} />
  </div>;
}
