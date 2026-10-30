"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, type LucideIcon } from "lucide-react";
import { rooms } from "@/content/rooms";

export function RoomPage({ slug, eyebrow, title, description, icon: Icon, children }: { slug: string; eyebrow: string; title: string; description: string; icon: LucideIcon; children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const room = rooms.find((item) => item.slug === slug);
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .42, ease: "easeOut" }}>
    <div className="content-width">
      <section className="room-hero">
        <div><div className="eyebrow"><Link href="/">Home</Link> <span aria-hidden="true">/</span> {eyebrow}</div><h1 className="display">{title}</h1><p>{description}</p><div className="button-row"><Link className="button-soft" href="/"><ArrowLeft size={15} /> Back to the house</Link>{room && <Link className="link-text" href={`/${rooms[(rooms.indexOf(room) + 1) % rooms.length].slug}`}>Wander next <ArrowUpRight size={14} /></Link>}</div></div>
        <div className="room-art" style={{ "--room-pale": room?.pale } as React.CSSProperties} aria-hidden="true"><div className="art-center"><Icon /></div></div>
      </section>
      <section className="room-content">{children}</section>
    </div>
  </motion.div>;
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`room-section soft-panel ${className}`}>{children}</section>; }
