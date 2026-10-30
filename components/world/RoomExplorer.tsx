"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Sparkle } from "@phosphor-icons/react/ssr";
import { rooms } from "@/content/rooms";

const scenes: Record<string, { image: string; alt: string; glimpse: string }> = {
  studio: { image: "/assets/rooms/coding-studio.webp", alt: "A real coding desk with a laptop, headphones and notes", glimpse: "Interfaces, search, systems" },
  arcade: { image: "/assets/games/final-fantasy-xvi.webp", alt: "Official Final Fantasy XVI artwork", glimpse: "Quests, worlds, one more turn" },
  music: { image: "/assets/rooms/listening-room.webp", alt: "A warmly lit listening corner with records and lamps", glimpse: "Songs as Not Shadman" },
  library: { image: "/assets/rooms/library-room.webp", alt: "A small, welcoming bookstore lined with books", glimpse: "Reading and research" },
  journeys: { image: "/assets/rooms/journeys-room.webp", alt: "The evening light over Arthur's Seat in Edinburgh", glimpse: "Places on the map" },
  garage: { image: "/assets/rooms/slavia-deep-black.png", alt: "Reference image of a Škoda Slavia in Deep Black", glimpse: "A small drive, a long way home" },
  garden: { image: "/assets/rooms/garden-room.webp", alt: "Lavender flowers in soft afternoon light", glimpse: "Life beyond the screen" },
  about: { image: "/assets/rooms/coding-studio.webp", alt: "A real coding desk with a laptop and notes", glimpse: "The person behind the doors" },
};

export function RoomExplorer() {
  const [activeSlug, setActiveSlug] = useState("studio");
  const reduceMotion = useReducedMotion();
  const active = rooms.find((room) => room.slug === activeSlug) ?? rooms[0];
  const scene = scenes[active.slug];
  const Icon = active.icon;

  return (
    <section className="room-explorer" aria-labelledby="room-explorer-title" style={{ "--preview-accent": active.color } as React.CSSProperties}>
      <div className="room-explorer-heading">
        <div>
          <span className="home-section-eyebrow"><Sparkle size={13} weight="fill" /> PICK A LIGHT IN THE HOUSE</span>
          <h2 className="display" id="room-explorer-title">One little world.<br /><em>Eight ways in.</em></h2>
        </div>
        <p>Choose a room to get a feel for it. The whole place changes with the door.</p>
      </div>

      <div className="room-explorer-stage">
        <div className="room-preview-scene" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className={`room-preview-image room-preview-image-${active.slug}`}
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.22, 0.7, 0.22, 1] }}
            >
              <Image src={scene.image} alt={scene.alt} fill sizes="(max-width: 820px) 100vw, 60vw" priority />
              <span className="room-preview-scrim" />
              <span className="room-preview-live"><span /> {active.label.toUpperCase()} · ROOM {String(rooms.indexOf(active) + 1).padStart(2, "0")}</span>
            </motion.div>
          </AnimatePresence>
          <div className="room-preview-copy">
            <span className="room-preview-icon"><Icon size={18} weight="duotone" /></span>
            <div><small>TAKE A LOOK AROUND</small><h3>{active.title}</h3><p>{scene.glimpse}</p></div>
            <Link href={`/${active.slug}`} aria-label={`Enter ${active.title}`} className="room-preview-enter"><ArrowUpRight size={19} /></Link>
          </div>
          <Link className="room-preview-go" href={`/${active.slug}`}>Enter this room <ArrowDownRight size={15} /></Link>
        </div>

        <div className="room-explorer-list" role="group" aria-label="Choose a room to preview">
          {rooms.map((room, index) => {
            const RoomIcon = room.icon;
            const selected = room.slug === active.slug;
            return (
              <button
                type="button"
                key={room.slug}
                className={`room-explorer-choice${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() => setActiveSlug(room.slug)}
                style={{ "--choice-accent": room.color } as React.CSSProperties}
              >
                <span className="room-choice-number">0{index + 1}</span>
                <span className="room-choice-icon"><RoomIcon size={18} weight="duotone" /></span>
                <span className="room-choice-copy"><strong>{room.title}</strong><small>{room.short}</small></span>
                <ArrowUpRight className="room-choice-arrow" size={15} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
