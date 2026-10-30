"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, FlagCheckered, Gauge, Heart, Play, SteeringWheel } from "@phosphor-icons/react/ssr";
import { useReducedMotion } from "motion/react";

type TrafficCar = { id: number; lane: number };
type DrivePhase = "parked" | "cruising" | "finished";

function Sedan({ traffic = false }: { traffic?: boolean }) {
  return <svg className={`drive-car-art${traffic ? " is-traffic" : ""}`} viewBox="0 0 260 148" aria-hidden="true">
    <defs>
      <linearGradient id="body-paint" x1="0" y1="0" x2="0.9" y2="1"><stop stopColor="#686878" /><stop offset=".38" stopColor="#232535" /><stop offset="1" stopColor="#111523" /></linearGradient>
      <linearGradient id="windshield" x1="0" y1="0" x2="0.7" y2="1"><stop stopColor="#c9e1f0" /><stop offset="1" stopColor="#697eaa" /></linearGradient>
      <linearGradient id="headlight" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#fff6d3" /><stop offset="1" stopColor="#e8b968" /></linearGradient>
    </defs>
    <ellipse cx="130" cy="133" rx="99" ry="10" fill="#11172a" opacity=".33" />
    <path d="m38 102 9-35q2-9 13-13l29-11 14-22q5-8 16-8h23q11 0 17 8l14 22 29 11q10 4 13 13l9 35-11 20q-4 7-14 7H63q-10 0-14-7z" fill="url(#body-paint)" stroke="#8a879b" strokeOpacity=".65" strokeWidth="2" />
    <path d="m98 46 14-23q2-3 8-3h21q6 0 8 3l14 23z" fill="url(#windshield)" stroke="#bcc8df" strokeWidth="2" />
    <path d="m49 69 34-13 10 33H45z" fill="#3b425d" stroke="#7d8296" strokeWidth="1.5" />
    <path d="m177 56 34 13 4 20h-48z" fill="#3b425d" stroke="#7d8296" strokeWidth="1.5" />
    <path d="M130 47v42" stroke="#c7c5d3" strokeOpacity=".5" strokeWidth="2" />
    <path d="m42 77 17-8 21 5-5 9-31 4zM180 74l21-5 17 8-2 10-31-4z" fill="url(#headlight)" />
    <path d="m62 97 15-6h106l15 6-4 15q-2 6-9 6H75q-7 0-9-6z" fill="#151a29" stroke="#6c6e7f" strokeWidth="2" />
    <path d="M103 98h54l-4 13h-46z" fill="#262b3c" stroke="#8b8395" strokeWidth="1.5" />
    <path d="M111 101v8m9-8v8m9-8v8m9-8v8m9-8v8m9-8v8" stroke="#817e92" strokeWidth="1" />
    <path d="m49 112 18 1-6 8H51q-6 0-7-5zM193 113l18-1 5 4q-1 5-7 5h-10z" fill="#c87973" />
    <path d="M41 80 20 87v7l20 1m179-15 21 7v7l-20 1" fill="#30364a" stroke="#79788a" strokeWidth="2" />
    <path d="M88 116v8m84-8v8" stroke="#dad2c0" strokeWidth="3" strokeLinecap="round" />
    <circle cx="64" cy="117" r="18" fill="#151720" stroke="#080b12" strokeWidth="3" /><circle cx="64" cy="117" r="9" fill="#a7a8b8" stroke="#505367" strokeWidth="3" />
    <circle cx="196" cy="117" r="18" fill="#151720" stroke="#080b12" strokeWidth="3" /><circle cx="196" cy="117" r="9" fill="#a7a8b8" stroke="#505367" strokeWidth="3" />
  </svg>;
}

const buildings = Array.from({ length: 23 }, (_, index) => ({
  id: index,
  height: 30 + ((index * 37 + 23) % 72),
  width: 25 + ((index * 19 + 11) % 28),
  delay: -((index * 17) % 30)
}));

export function DriveArcade() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<DrivePhase>("parked");
  const [lane, setLane] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const [traffic, setTraffic] = useState<TrafficCar[]>([]);
  const [message, setMessage] = useState("The city is yours. Press start when you’re ready.");
  const laneRef = useRef(1);
  const livesRef = useRef(3);
  const nextCarId = useRef(0);

  const steer = useCallback((direction: -1 | 1) => {
    setLane((current) => {
      const next = Math.max(0, Math.min(2, current + direction));
      laneRef.current = next;
      return next;
    });
  }, []);

  const startDrive = () => {
    laneRef.current = 1;
    livesRef.current = 3;
    setLane(1);
    setLives(3);
    setSpeed(88);
    setDistance(0);
    setTraffic([]);
    setMessage(reduceMotion ? "Easy cruise · use the arrows to change lanes." : "Find a gap, keep your line, and enjoy the night.");
    setPhase("cruising");
  };

  useEffect(() => {
    if (phase !== "cruising") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") steer(-1);
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") steer(1);
    };
    window.addEventListener("keydown", onKeyDown);
    const paceTimer = window.setInterval(() => {
      setDistance((value) => value + 1);
      setSpeed((value) => Math.min(188, value + 5));
    }, 900);
    const trafficTimer = reduceMotion ? undefined : window.setInterval(() => {
      const lane = Math.floor(Math.random() * 3);
      setTraffic((cars) => [...cars, { id: nextCarId.current++, lane }]);
    }, 1370);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearInterval(paceTimer);
      if (trafficTimer !== undefined) window.clearInterval(trafficTimer);
    };
  }, [phase, reduceMotion, steer]);

  const passTraffic = (car: TrafficCar) => {
    setTraffic((cars) => cars.filter((item) => item.id !== car.id));
    if (phase !== "cruising") return;
    if (car.lane === laneRef.current) {
      const remaining = Math.max(0, livesRef.current - 1);
      livesRef.current = remaining;
      setLives(remaining);
      if (remaining === 0) {
        setBest((value) => Math.max(value, distance));
        setSpeed(0);
        setPhase("finished");
        setMessage("A gentle bump. That’s your run — fancy another go?");
      } else setMessage(`Close one. ${remaining} ${remaining === 1 ? "life" : "lives"} left — steer into a clear lane.`);
    } else {
      setDistance((value) => value + 2);
      setMessage("Nice line. Keep the road flowing.");
    }
  };

  const playerPosition = ["25%", "50%", "75%"][lane];
  const progress = Math.min(100, Math.round((speed / 188) * 100));

  return <div className="drive-arcade">
    <div className="drive-intro">
      <div><span className="eyebrow"><FlagCheckered size={13} /> A LITTLE ARCADE RUN</span><h2 className="display">Midnight run</h2><p>Three lanes, sleepy traffic, no rush. How long can you keep the road clear?</p></div>
      <div className="drive-key-hint" aria-label="Use left and right arrow keys, or A and D, to steer"><kbd>←</kbd><span>STEER</span><kbd>→</kbd></div>
    </div>

    <div className={`drive-scene${phase === "cruising" ? " is-cruising" : ""}`} role="group" aria-label="Playable night-driving arcade scene">
      <div className="drive-sky" aria-hidden="true"><div className="drive-sun" /><div className="drive-skyline drive-skyline-far">{buildings.map((building) => <i key={building.id} style={{ "--building-height": `${building.height}%`, "--building-width": `${building.width}px`, "--building-delay": `${building.delay}s` } as React.CSSProperties} />)}</div><div className="drive-skyline drive-skyline-near">{buildings.slice(0, 14).map((building) => <i key={building.id} style={{ "--building-height": `${building.height * .72}%`, "--building-width": `${building.width * 1.15}px`, "--building-delay": `${building.delay}s` } as React.CSSProperties} />)}</div></div>
      <div className="drive-horizon-glow" aria-hidden="true" />
      <div className="drive-road" aria-hidden="true"><i className="drive-lane-line lane-one" /><i className="drive-lane-line lane-two" /><i className="drive-road-shine" /></div>
      <div className="drive-roadside road-side-left" aria-hidden="true"><i /><i /><i /></div><div className="drive-roadside road-side-right" aria-hidden="true"><i /><i /><i /></div>
      <div className="drive-hud">
        <div className="drive-hud-card"><span>RUN DISTANCE</span><strong>{String(distance).padStart(2, "0")}<small>KM</small></strong><i className="drive-best">BEST {String(best).padStart(2, "0")} KM</i></div>
        <div className="drive-hud-card speed-readout"><span><Gauge size={12} /> SPEEDOMETER</span><strong>{speed}<small>KM/H</small></strong><i className="speed-track"><i style={{ width: `${progress}%` }} /></i></div>
        <div className="drive-lives" aria-label={`${lives} lives remaining`}><span>SHIELDS</span><div>{Array.from({ length: 3 }, (_, index) => <Heart key={index} size={15} weight={index < lives ? "fill" : "regular"} className={index < lives ? "life-on" : "life-off"} aria-hidden="true" />)}</div></div>
      </div>
      {traffic.map((car) => <div key={car.id} className="drive-traffic" style={{ left: ["25%", "50%", "75%"][car.lane] }} onAnimationEnd={() => passTraffic(car)}><Sedan traffic /></div>)}
      <div className="drive-player" style={{ "--player-lane": playerPosition } as React.CSSProperties}><Sedan /></div>
      {phase !== "cruising" && <div className="drive-start-overlay"><span className="drive-overlay-kicker">BLACK SLAVIA · CITY LOOP 01</span><strong>{phase === "finished" ? "One more lap?" : "The city’s still awake."}</strong><span>{reduceMotion ? "Take the calm cruise, at your own pace." : "Pick a lane. Let the lights roll by."}</span><button type="button" className="drive-start-button" onClick={startDrive}><Play size={14} weight="fill" /> {phase === "finished" ? "DRIVE AGAIN" : "START THE DRIVE"}</button></div>}
      <div className="drive-controls" aria-label="Driving controls"><button type="button" onClick={() => steer(-1)} disabled={phase !== "cruising"} aria-label="Steer left"><ArrowLeft size={20} /></button><span><SteeringWheel size={17} /> {phase === "cruising" ? "MOVE TO A CLEAR LANE" : "READY WHEN YOU ARE"}</span><button type="button" onClick={() => steer(1)} disabled={phase !== "cruising"} aria-label="Steer right"><ArrowRight size={20} /></button></div>
    </div>
    <div className="drive-status-bar"><span aria-live="polite">{message}</span><span><i /> {phase === "cruising" ? "ON THE ROAD" : phase === "finished" ? "PARKED UP" : "ENGINE IDLE"}</span></div>
  </div>;
}
