"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { MapTrifold, ArrowCounterClockwise } from "@phosphor-icons/react/ssr";

const cards = [
  { city: "Belfast", sub: "Northern Ireland", tone: "#e9e6ee", ink: "#7d748a", angle: -5 },
  { city: "Jaipur", sub: "India", tone: "#f3e8db", ink: "#b67e62", angle: 4 }
];

export function PostcardWall() {
  const [flipped, setFlipped] = useState<boolean[]>([false, false]);
  const reduced = useReducedMotion();
  return <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }} aria-label="Illustrated postcards; select to flip">
    {cards.map((card, index) => <button key={card.city} type="button" aria-pressed={flipped[index]} aria-label={`${flipped[index] ? "Show illustration for" : "Flip postcard from"} ${card.city}`} onClick={() => setFlipped((current) => current.map((value, i) => i === index ? !value : value))} style={{ width: 142, height: 115, padding: 0, border: 0, background: "transparent", cursor: "pointer", perspective: 600 }}>
      <motion.span animate={reduced ? undefined : { rotateY: flipped[index] ? 180 : 0, rotate: flipped[index] ? 0 : card.angle }} transition={{ duration: reduced ? 0 : .48, type: "spring", stiffness: 150, damping: 18 }} style={{ display: "grid", placeItems: "center", position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", boxShadow: "0 8px 20px #594a321a", border: "7px solid #fffefa", background: card.tone, color: card.ink }}>
        <span style={{ gridArea: "1/1", backfaceVisibility: "hidden", display: "grid", placeItems: "center", gap: 5 }}><MapTrifold size={30} /><small className="eyebrow">Tap to flip</small></span>
        <span style={{ gridArea: "1/1", transform: "rotateY(180deg)", backfaceVisibility: "hidden", display: "grid", placeItems: "center", gap: 3 }}><strong className="display" style={{ fontSize: 22 }}>{card.city}</strong><small style={{ fontSize: 10 }}>{card.sub}</small><ArrowCounterClockwise size={12} style={{ marginTop: 5 }} /></span>
      </motion.span>
    </button>)}
  </div>;
}
