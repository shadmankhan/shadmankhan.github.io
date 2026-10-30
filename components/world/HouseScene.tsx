"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HouseFallback } from "@/components/world/HouseFallback";
import { rooms } from "@/content/rooms";

const DioramaCanvas = dynamic(() => import("./DioramaCanvas").then((module) => module.DioramaCanvas), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn("The 3D house is unavailable; showing the illustrated house instead.", error, info); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function HouseScene() {
  const router = useRouter();
  const host = useRef<HTMLDivElement>(null);
  // Start with the accessible illustrated version on every device. Desktop upgrades
  // to WebGL after the viewport is known; phones never mount and immediately tear it down.
  const [lightweight, setLightweight] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 620px)");
    const update = () => { setSceneReady(false); setLightweight(media.matches); };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!host.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="diorama-frame" role="group" aria-label="Interactive miniature house">
      {lightweight ? <HouseFallback /> : (
        <div className={`house-scene${sceneReady ? " scene-ready" : ""}`}>
          <HouseFallback hidden={sceneReady} />
          <div className="house-scene-canvas">
            <SceneBoundary fallback={<div />}>
              <DioramaCanvas onNavigate={(href) => router.push(href)} animated={!reduceMotion && visible} onReady={() => setSceneReady(true)} />
            </SceneBoundary>
          </div>
          <nav className="house-room-access" aria-label="Choose a room in the house">
            {rooms.map((room) => <Link href={`/${room.slug}`} key={room.slug}>{room.title}</Link>)}
          </nav>
        </div>
      )}
    </div>
  );
}
