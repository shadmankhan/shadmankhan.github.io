"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Lamp, Plant } from "@phosphor-icons/react/ssr";

export function LogicPuzzle() {
  const [switches, setSwitches] = useState([false, false, false]);
  const lit = switches[0] && !switches[1] && switches[2];
  const reduceMotion = useReducedMotion();
  const toggle = (index: number) => setSwitches((current) => current.map((value, i) => i === index ? !value : value));
  return <div className="mini-card" style={{ textAlign: "center", padding: 24 }}>
    <span className="eyebrow">A tiny desk puzzle</span><h3 style={{ marginTop: 9 }}>Can you light the lamp?</h3>
    <p>Switch one and three on. Leave the middle switch off.</p>
    <div style={{ minHeight: 98, display: "flex", alignItems: "center", justifyContent: "center", gap: 13 }}><motion.div animate={reduceMotion ? undefined : { filter: lit ? "drop-shadow(0 0 22px #f6d277)" : "drop-shadow(0 0 0px transparent)" }}><Lamp size={68} strokeWidth={1.25} color={lit ? "#ac8743" : "#8d887e"} weight={lit ? "duotone" : "regular"} aria-label={lit ? "Desk lamp, glowing" : "Desk lamp, off"} /></motion.div>{lit && <motion.div initial={reduceMotion ? false : { scale: .45, opacity: 0, y: 6 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 240, damping: 17 }} aria-label="The desk plant grew"><Plant size={38} color="#7f758d" /></motion.div>}</div>
    <div className="switch-row">{switches.map((on, index) => <button type="button" key={index} aria-pressed={on} aria-label={`Switch ${index + 1}, ${on ? "on" : "off"}`} onClick={() => toggle(index)} className={`logic-switch${on ? " on" : ""}`}><span aria-hidden="true" style={{ fontSize: 20 }}>{on ? "●" : "○"}</span><span>Switch {index + 1}</span></button>)}</div>
    <p aria-live="polite" style={{ minHeight: 27, color: lit ? "#6d617d" : "var(--muted)" }}>{lit ? <><Plant size={14} style={{ verticalAlign: "-3px" }} /> The lamp is on. A little desk plant looks happier already.</> : "The lamp is waiting for the right combination."}</p>
    <button className="link-text" type="button" onClick={() => setSwitches([false, false, false])}>Reset switches</button>
  </div>;
}
