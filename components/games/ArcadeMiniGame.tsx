"use client";

import { useState } from "react";
import { useReducedMotion, motion } from "motion/react";
import { Heart, Leaf, Moon, ArrowCounterClockwise, Sparkle, Sun } from "@phosphor-icons/react/ssr";

const symbols = ["leaf", "moon", "sun", "heart", "sun", "leaf", "heart", "moon"] as const;
type CardSymbol = (typeof symbols)[number];
const faces = { leaf: Leaf, moon: Moon, sun: Sun, heart: Heart };
const shuffleDeck = () => {
  const result = [...symbols];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result as CardSymbol[];
};

export function ArcadeMiniGame() {
  const [deck, setDeck] = useState<CardSymbol[]>([...symbols]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const reduceMotion = useReducedMotion();
  const complete = matched.length === deck.length;

  const flip = (index: number) => {
    if (locked || open.includes(index) || matched.includes(index)) return;
    const next = [...open, index];
    setOpen(next);
    if (next.length === 2) {
      setMoves((count) => count + 1);
      if (deck[next[0]] === deck[next[1]]) {
        setMatched((current) => [...current, ...next]);
        setOpen([]);
      } else {
        setLocked(true);
        window.setTimeout(() => { setOpen([]); setLocked(false); }, 720);
      }
    }
  };
  const restart = () => { setDeck(shuffleDeck()); setMatched([]); setOpen([]); setMoves(0); setLocked(false); };

  return <div>
    <div className="game-status"><div><span className="pill"><Sparkle size={13} /> A pocket-sized matching game</span><p style={{ margin: "9px 0 0", color: "var(--muted)", fontSize: 13 }}>Find the four pairs. Turn-based, no timer, no leaderboard.</p></div><button className="button-outline" onClick={restart}><ArrowCounterClockwise size={14} /> Start over</button></div>
    <div className="memory-grid" role="group" aria-label="Memory matching game">
      {deck.map((face, index) => {
        const Icon = faces[face]; const revealed = open.includes(index) || matched.includes(index);
        return <motion.button key={index} className={`memory-card${revealed ? " is-open" : ""}${matched.includes(index) ? " is-matched" : ""}`} type="button" onClick={() => flip(index)} disabled={matched.includes(index)} aria-label={revealed ? `${face} card${matched.includes(index) ? ", matched" : ""}` : `Face down card ${index + 1}`} aria-pressed={revealed} whileTap={reduceMotion ? undefined : { scale: .94 }}>
          {revealed ? <Icon size={25} strokeWidth={1.7} aria-hidden="true" /> : <span aria-hidden="true" style={{ color: "#c1ae91", fontFamily: "Georgia,serif", fontSize: 22 }}>✳</span>}
        </motion.button>;
      })}
    </div>
    <p aria-live="polite" style={{ textAlign: "center", color: complete ? "#6c607d" : "var(--muted)", fontSize: 14, minHeight: 25 }}>{complete ? `All pairs found in ${moves} turns. High five from the beanbag!` : `Pairs found: ${matched.length / 2} of 4 · Turns: ${moves}`}</p>
  </div>;
}
