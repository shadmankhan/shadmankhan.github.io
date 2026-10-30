"use client";

import { useState } from "react";
import { Key, ArrowCounterClockwise } from "@phosphor-icons/react/ssr";

export function GearToy() {
  const [started, setStarted] = useState(false);
  const [gear, setGear] = useState("N");
  const [steering, setSteering] = useState(0);
  const move = started && gear !== "N";
  return <div className="gear-panel">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, flexWrap: "wrap" }}><div><span className="eyebrow">A fictional driveway simulation</span><h3 style={{ margin: "7px 0 0" }}>Take the tiny Slavia for a spin</h3></div><button className={started ? "button-soft" : "button-primary"} type="button" onClick={() => setStarted((value) => !value)}>{started ? <ArrowCounterClockwise size={14} /> : <Key size={14} />}{started ? "Park it" : "Turn the key"}</button></div>
    <div className={`road${move ? " moving" : ""}`} aria-label={move ? "Road scenery moving in the fictional simulation" : "Parked car on a quiet driveway"}>
      <svg className="car-illustration" style={{ transform: `translateX(${steering * .12}px) rotate(${steering * .1}deg)`, filter: started ? "drop-shadow(0 0 7px #fff1a5)" : "none" }} viewBox="0 0 180 86" role="img" aria-label="Illustration of a small black sedan"><path d="M18 54 26 38q4-9 14-10l21-3 18-16q4-4 12-4h34q10 0 16 9l15 24q8 3 10 9v17H13V54z" fill="#303638"/><path d="m69 27 16-14q2-2 8-2h20v17zM119 11v17h31l-13-18q-3-4-9-4h-9z" fill="#bad6d7"/><path d="M18 52h151" stroke="#d4b790" strokeWidth="3"/><circle cx="48" cy="66" r="14" fill="#292b2a"/><circle cx="48" cy="66" r="7" fill="#c3b8a6"/><circle cx="143" cy="66" r="14" fill="#292b2a"/><circle cx="143" cy="66" r="7" fill="#c3b8a6"/><path d="M17 48h15M155 46h14" stroke={started ? "#fff2ae" : "#b9ab84"} strokeWidth={started ? "7" : "3"} strokeLinecap="round"/></svg>
    </div>
    <div className="two-col" style={{ alignItems: "center" }}><div><span className="eyebrow">Manual gearbox</span><div className="gear-buttons" role="group" aria-label="Choose a gear">{["R","1","2","3","4","5","N"].map((item) => <button key={item} type="button" className="gear-button" aria-pressed={gear === item} onClick={() => setGear(item)}>{item}</button>)}</div><p aria-live="polite" style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>{!started ? "The engine is off. Turn the key to begin." : gear === "N" ? "Engine on · Neutral" : `Engine on · Gear ${gear} · scenery ${move ? "rolling gently" : "still"}`}</p></div><div><span className="eyebrow">Steering wheel</span><input className="steering" type="range" min="-45" max="45" value={steering} onChange={(event) => setSteering(Number(event.target.value))} aria-label="Turn the steering wheel" /><p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)" }}>Wheel angle: {steering}°</p></div></div>
    <p className="notice" style={{ marginTop: 18 }}>A playful illustration of a black Škoda Slavia 1.0 TSI, petrol, manual. Personal description; this is not a photograph or a real vehicle simulator.</p>
  </div>;
}
