"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Headphones, MusicNotes, Play } from "@phosphor-icons/react/ssr";

const pads = [
  { name: "Amethyst", note: 261.63, className: "echo-amethyst" },
  { name: "Rose", note: 329.63, className: "echo-rose" },
  { name: "Sapphire", note: 392, className: "echo-sapphire" },
  { name: "Gold", note: 523.25, className: "echo-gold" }
];

type Turn = "ready" | "listening" | "echo" | "win" | "miss";

export function TuneEcho() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [turn, setTurn] = useState<Turn>("ready");
  const [echoStep, setEchoStep] = useState(0);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [best, setBest] = useState(0);
  const patternRef = useRef<number[]>([]);
  const audioRef = useRef<AudioContext | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  const playNote = (index: number) => {
    if (typeof window === "undefined") return;
    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) return;

    const context = audioRef.current ?? new AudioContextConstructor();
    audioRef.current = context;
    if (context.state === "suspended") void context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.value = pads[index].note;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.21);
  };

  useEffect(() => () => {
    clearTimers();
    void audioRef.current?.close();
  }, []);

  useEffect(() => {
    if (turn !== "listening") return;
    clearTimers();
    pattern.forEach((pad, index) => {
      timers.current.push(window.setTimeout(() => {
        setActivePad(pad);
        playNote(pad);
      }, index * 460));
      timers.current.push(window.setTimeout(() => setActivePad(null), index * 460 + 225));
    });
    timers.current.push(window.setTimeout(() => {
      setActivePad(null);
      setEchoStep(0);
      setTurn("echo");
    }, pattern.length * 460));
    return clearTimers;
  }, [turn, pattern]);

  const startRound = () => {
    clearTimers();
    setActivePad(null);
    const base = turn === "miss" ? [] : patternRef.current;
    const next = [...base, Math.floor(Math.random() * pads.length)];
    patternRef.current = next;
    setPattern(next);
    setTurn("listening");
  };

  const replay = () => {
    clearTimers();
    patternRef.current = [];
    setPattern([]);
    setEchoStep(0);
    setActivePad(null);
    setTurn("ready");
  };

  const tapPad = (index: number) => {
    if (turn !== "echo") return;
    playNote(index);
    setActivePad(index);
    window.setTimeout(() => setActivePad(null), 170);
    if (pattern[echoStep] !== index) {
      patternRef.current = [];
      setTurn("miss");
      return;
    }
    if (echoStep === pattern.length - 1) {
      setBest((value) => Math.max(value, pattern.length));
      setTurn("win");
      return;
    }
    setEchoStep((value) => value + 1);
  };

  const status = turn === "listening"
    ? "Listen closely…"
    : turn === "echo"
      ? `Your turn · note ${echoStep + 1} of ${pattern.length}`
      : turn === "win"
        ? `Lovely. You echoed all ${pattern.length} notes.`
        : turn === "miss"
          ? "That tune wandered off. Shall we try a fresh one?"
          : "A tiny four-note memory game, played by ear.";

  const actionLabel = turn === "listening" ? "Listen…" : turn === "win" ? "Add a note" : turn === "miss" ? "Try a fresh tune" : "Listen & play";

  return <div className="tune-echo" aria-labelledby="tune-echo-title">
    <div className="tune-echo-copy">
      <span className="eyebrow"><Headphones size={13} /> a tiny listening game</span>
      <h3 id="tune-echo-title">Tune echo</h3>
      <p>Hear the little melody, then play it back. Each round adds one quick note. Sound starts only when you press play.</p>
      <div className="tune-echo-bottom">
        <div className="echo-score"><MusicNotes size={15} /><span>Best streak</span><strong>{best}</strong></div>
        {turn !== "ready" && <button className="echo-reset" type="button" onClick={replay}><ArrowCounterClockwise size={15} /> Reset</button>}
      </div>
    </div>
    <div className="echo-console">
      <div className="echo-console-head"><span className="echo-light" /><span>ROOM TONE</span><span className="echo-round">{pattern.length ? `ROUND ${pattern.length}` : "READY"}</span></div>
      <div className="echo-pad-grid" role="group" aria-label="Four musical note pads">
        {pads.map((pad, index) => <button key={pad.name} type="button" className={`echo-pad ${pad.className}${activePad === index ? " is-lit" : ""}`} onClick={() => tapPad(index)} disabled={turn !== "echo"} aria-label={`${pad.name} note${turn === "echo" ? `, note ${echoStep + 1} of ${pattern.length}` : ""}`}>
          <span className="echo-pad-core" aria-hidden="true" />
        </button>)}
      </div>
      <div className="echo-console-foot"><span className="echo-status" aria-live="polite">{status}</span><button type="button" className="echo-play" onClick={startRound} disabled={turn === "listening" || turn === "echo"}><Play size={14} weight="fill" /> {actionLabel}</button></div>
    </div>
  </div>;
}
