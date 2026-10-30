"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, House, User } from "@phosphor-icons/react/ssr";
import { rooms } from "@/content/rooms";

const roomArtwork: Record<string, string> = {
  studio: "/assets/rooms/coding-studio.webp",
  arcade: "/assets/games/final-fantasy-xvi.webp",
  music: "/assets/rooms/listening-room.webp",
  library: "/assets/rooms/library-room.webp",
  journeys: "/assets/rooms/journeys-room.webp",
  garden: "/assets/rooms/garden-room.webp",
};

const roomWelcome: Record<string, string> = {
  studio: "Thoughtful software, built with people.",
  arcade: "Pick a world. Stay a while.",
  music: "Songs, stories & a listening ear.",
  library: "Books on the desk. Ideas in motion.",
  journeys: "Places remembered in little details.",
  garage: "One more turn before the driveway.",
  garden: "A little room to be a person.",
  about: "A software engineer with many open tabs.",
};

export function RoomPage({ slug, eyebrow, title, description, children }: {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const roomIndex = rooms.findIndex((item) => item.slug === slug);
  const room = rooms[roomIndex];
  const Icon = room?.icon ?? User;
  const nextRoom = roomIndex >= 0 ? rooms[(roomIndex + 1) % rooms.length] : undefined;
  const artwork = roomArtwork[slug];
  const roomStyle = { "--room-accent": room?.color, "--room-pale": room?.pale } as CSSProperties;

  return (
    <div className={`world-room-page world-room-page-${slug}`} style={roomStyle}>
      <section className="room-hero world-room-hero" aria-labelledby={`room-title-${slug}`}>
        {artwork && <div className="room-hero-photo" aria-hidden="true"><Image className="room-vignette-image" src={artwork} alt="" fill sizes="100vw" priority={slug === "arcade" || slug === "studio" || slug === "music"} /></div>}
        <div className="room-hero-scrim" aria-hidden="true" />
        <div className="room-hero-inner content-width">
          <div className="room-breadcrumb"><Link href="/" aria-label="Back to my world"><House size={14} weight="fill" /> My world</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></div>
          <div className="room-hero-copy">
            <div className="room-heading-lockup"><span className="room-heading-icon" aria-hidden="true"><Icon size={18} weight="duotone" /></span><span className="eyebrow">ROOM {String(roomIndex + 1).padStart(2, "0")} / 08</span></div>
            <span className="room-mood-line">{roomWelcome[slug]}</span>
            <h1 id={`room-title-${slug}`} className="display">{title}</h1>
            <p>{description}</p>
            <div className="button-row room-hero-actions"><Link className="room-back-link" href="/"><ArrowLeft size={14} /> The house</Link>{nextRoom && <Link className="world-next-link" href={`/${nextRoom.slug}`}>Wander to {nextRoom.label} <ArrowRight size={14} /></Link>}</div>
          </div>
          <div className="room-hero-bottom"><span><i aria-hidden="true" /> A ROOM OF MY OWN</span><Link href="/about">Meet the person behind it <ArrowUpRight size={14} /></Link></div>
        </div>
        <span className="room-hero-edge" aria-hidden="true">SCROLL TO WANDER <ArrowRight size={12} /></span>
      </section>

      <div className="content-width room-body-width"><section className="room-content world-room-content">{children}</section><nav className="world-room-end" aria-label="More rooms"><Link href="/"><House size={16} /> Return to the house</Link>{nextRoom && <Link href={`/${nextRoom.slug}`}>Next room: {nextRoom.title} <ArrowUpRight size={14} /></Link>}</nav></div>
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`room-section soft-panel world-section-card ${className}`}>{children}</section>;
}
