"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowSquareOut, GameController } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { profile } from "@/content/public-profile";

const radarWorlds = [
  { title: "Assassin’s Creed Shadows", status: "ON MY RADAR", note: "Two paths through feudal Japan", image: "/assets/games/assassins-creed-shadows.jpg", alt: "Naoe in official Assassin’s Creed Shadows key art", source: "https://www.ubisoft.com/en-us/game/assassins-creed/shadows" },
  { title: "Assassin’s Creed Mirage", status: "ON MY RADAR", note: "A quieter city, a careful step", image: "/assets/games/assassins-creed-mirage.png", alt: "Basim in official Assassin’s Creed Mirage key art", source: "https://www.ubisoft.com/en-us/game/assassins-creed/mirage" },
];

const worlds = [
  ...profile.gaming.worlds.slice(0, 4).map((world, index) => ({ ...world, status: index === 0 ? "NOW PLAYING" : index === 1 ? "NEXT UP" : "ON THE LIST" })),
  ...radarWorlds,
];

export function ArcadeWorlds() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const world = worlds[selected];

  const move = (step: number) => setSelected((index) => (index + step + worlds.length) % worlds.length);

  return <div className="arcade-world-player">
    <div className="arcade-player-topline"><span><i /> GAME SHELF · A WINDOW INTO OTHER WORLDS</span><span>{String(selected + 1).padStart(2, "0")} <i /> {String(worlds.length).padStart(2, "0")}</span></div>
    <div className="arcade-feature">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div className="arcade-feature-art" key={world.title} initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .35 }}>
          <Image src={world.image} alt={world.alt} fill sizes="(max-width: 800px) 100vw, 68vw" priority={selected === 0} />
        </motion.div>
      </AnimatePresence>
      <div className="arcade-feature-shade" />
      <div className="arcade-feature-copy"><span className="arcade-status"><i /> {world.status}</span><AnimatePresence mode="wait" initial={false}><motion.div key={world.title} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : .23 }}><h2>{world.title}</h2><p>{world.note}</p></motion.div></AnimatePresence><div className="arcade-feature-actions"><button className="arcade-play-world" type="button" aria-pressed={playing} onClick={() => setPlaying((value) => !value)}><span className={playing ? "arcade-equalizer is-playing" : "arcade-equalizer"}><i /><i /><i /></span>{playing ? "Screen pulse on" : "Wake the screen"}</button><a href={world.source} target="_blank" rel="noreferrer">Official game page <ArrowSquareOut size={13} /></a></div></div>
      <div className="arcade-feature-controls"><button type="button" aria-label="Previous world" onClick={() => move(-1)}><ArrowLeft size={17} /></button><button type="button" aria-label="Next world" onClick={() => move(1)}><ArrowRight size={17} /></button></div>
      {playing && <div className="arcade-screen-glow" aria-hidden="true" />}
    </div>
    <div className="arcade-world-selector" role="tablist" aria-label="Choose a game world">{worlds.map((item, index) => <button type="button" key={item.title} role="tab" aria-selected={selected === index} className={selected === index ? "is-selected" : ""} onClick={() => setSelected(index)}><span className="arcade-selector-image"><Image src={item.image} alt="" fill sizes="88px" /></span><span><small>{item.status}</small><strong>{item.title}</strong></span></button>)}</div>
    <div className="arcade-player-foot"><span><GameController size={15} weight="duotone" /> FINAL FANTASY XVI IS THE CURRENT SAVE, FROM THE PROFILE SNAPSHOT</span><span>Radar picks are wish-list worlds, not play-status claims.</span></div>
  </div>;
}
