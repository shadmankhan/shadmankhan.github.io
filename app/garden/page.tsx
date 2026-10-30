"use client";

import { useState } from "react";
import { Barbell, Heart, ChatCircle, Sparkle, Waves, UsersThree } from "@phosphor-icons/react/ssr";
import { RoomPage, Section } from "@/components/shell/RoomPage";
import { OrchardRecall } from "@/components/garden/OrchardRecall";

const bits = [
  { title: "Swimming", detail: "A good reset away from screens.", icon: Waves },
  { title: "Gym days", detail: "Movement, without keeping score.", icon: Barbell },
  { title: "Friends", detail: "Road trips are better with company.", icon: UsersThree },
  { title: "Long conversations", detail: "A curious question can stretch into a whole evening.", icon: ChatCircle },
  { title: "Positive outlook", detail: "A personal preference, not a personality trophy.", icon: Heart },
  { title: "Everyday AI", detail: "Useful tools, practical questions, and plenty still to learn.", icon: Sparkle }
];

export default function GardenPage() {
  const [selected, setSelected] = useState(0);
  const current = bits[selected]; const CurrentIcon = current.icon;
  return <RoomPage slug="garden" eyebrow="Life garden" title="A little room to be a person." description="Swimming, workouts, friends, debates, and whatever curious thing takes over the afternoon.">
    <Section><div className="garden-scene" aria-label="Illustrated garden with clickable activity objects"><div className="garden-sun"/><div className="activity-orbs">{bits.map((item,index)=>{const Icon=item.icon;return <button className="activity-orb" type="button" key={item.title} aria-pressed={index===selected} onClick={()=>setSelected(index)}><span><Icon size={25} strokeWidth={1.35} /></span>{item.title}</button>;})}</div></div><div aria-live="polite" className="notice" style={{ marginTop: 15, display: "flex", gap: 10, alignItems: "center" }}><CurrentIcon size={17} /><span><strong>{current.title}.</strong> {current.detail}</span></div></Section>
    <Section><OrchardRecall /></Section>
    <div className="two-col"><Section><span className="eyebrow">An open bench</span><h2>Got a question or an idea?</h2><p>I like talking through how things work, what might work better, and why. Thoughtful disagreement is welcome too.</p><a className="button-primary" style={{ marginTop: 14 }} href="mailto:contactshadman@gmail.com?subject=Hello%20Shadman">Let’s talk</a></Section><Section><span className="eyebrow">Small conversation starter</span><h2 className="display">What’s something you learned by accident?</h2><p>Mine might involve an API response, a long drive, or a song that refused to leave the draft folder.</p></Section></div>
  </RoomPage>;
}
