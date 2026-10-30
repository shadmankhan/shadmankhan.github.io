"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Flower, Play, Sparkle } from "@phosphor-icons/react/ssr";

type Phase = "ready" | "showing" | "your-turn" | "win" | "miss";

export function OrchardRecall() {
  const [stage, setStage] = useState(1);
  const [pattern, setPattern] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [lit, setLit] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (phase !== "showing") return;
    clearTimers();
    pattern.forEach((flower, index) => {
      timers.current.push(window.setTimeout(() => setLit(flower), index * 720));
      timers.current.push(window.setTimeout(() => setLit(null), index * 720 + 390));
    });
    timers.current.push(window.setTimeout(() => {
      setLit(null);
      setStep(0);
      setPhase("your-turn");
    }, pattern.length * 720));
    return clearTimers;
  }, [phase, pattern]);

  const begin = () => {
    clearTimers();
    setLit(null);
    const amount = Math.min(stage + 2, 8);
    const nextPattern: number[] = [];
    while (nextPattern.length < amount) {
      const next = Math.floor(Math.random() * 9);
      if (nextPattern[nextPattern.length - 1] !== next) nextPattern.push(next);
    }
    setPattern(nextPattern);
    setPhase("showing");
  };

  const reset = () => {
    clearTimers();
    setStage(1);
    setStep(0);
    setLit(null);
    setPattern([]);
    setPhase("ready");
  };

  const tapFlower = (flower: number) => {
    if (phase !== "your-turn") return;
    setLit(flower);
    window.setTimeout(() => setLit(null), 180);
    if (pattern[step] !== flower) {
      setPhase("miss");
      return;
    }
    if (step === pattern.length - 1) {
      setStage((value) => value + 1);
      setPhase("win");
      return;
    }
    setStep((value) => value + 1);
  };

  const status = phase === "showing"
    ? "Watch the petals…"
    : phase === "your-turn"
      ? `Repeat the pattern · ${step + 1} of ${pattern.length}`
      : phase === "win"
        ? `Perfect memory. The garden grows to level ${stage}.`
        : phase === "miss"
          ? "One petal slipped away. Take another look."
          : "Watch the flowers light up, then tap them in order.";

  const actionLabel = phase === "showing" ? "Watch…" : phase === "your-turn" ? "Your turn…" : phase === "win" ? "Grow the garden" : phase === "miss" ? "Try this level again" : "Start the game";

  return <div className="orchard-recall" aria-labelledby="orchard-title">
    <div className="orchard-story">
      <span className="eyebrow"><Sparkle size={13} /> a little garden game</span>
      <h3 id="orchard-title">Orchard recall</h3>
      <p>A trail of flowers will light up. Remember their order and tap the same path. A gentle brain break for any screen.</p>
      <div className="orchard-level"><Flower size={16} /><span>Garden level</span><strong>{stage}</strong></div>
      {phase !== "ready" && <button type="button" className="echo-reset" onClick={reset}><ArrowCounterClockwise size={15} /> Start over</button>}
    </div>
    <div className="orchard-play-area">
      <div className="orchard-sky" aria-hidden="true"><span /><span /><span /></div>
      <div className="orchard-board" role="group" aria-label="Nine flower buttons">
        {Array.from({ length: 9 }, (_, index) => <button key={index} className={`orchard-cell flower-${index % 4}${lit === index ? " is-lit" : ""}`} type="button" disabled={phase !== "your-turn"} onClick={() => tapFlower(index)} aria-label={`Flower ${index + 1}${phase === "your-turn" ? `, tap ${step + 1} of ${pattern.length}` : ""}`}>
          <span className="orchard-petal" aria-hidden="true">✿</span>
        </button>)}
      </div>
      <div className="orchard-console-foot"><span aria-live="polite">{status}</span><button className="echo-play" type="button" onClick={begin} disabled={phase === "showing" || phase === "your-turn"}><Play size={14} weight="fill" /> {actionLabel}</button></div>
    </div>
  </div>;
}
