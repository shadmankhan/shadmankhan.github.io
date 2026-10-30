import Link from "next/link";
import { rooms } from "@/content/rooms";

const upstairs = ["studio", "library", "arcade", "journeys"];
const downstairs = ["music", "garage", "garden", "about"];

function RoomLinks({ slugs, floor }: { slugs: string[]; floor: string }) {
  return (
    <div className={`fallback-floor fallback-floor-${floor}`}>
      {slugs.map((slug) => {
        const room = rooms.find((item) => item.slug === slug);
        if (!room) return null;
        const Icon = room.icon;
        return (
          <Link href={`/${room.slug}`} className={`fallback-room-link fallback-${room.slug}`} key={room.slug} style={{ "--room-accent": room.color } as React.CSSProperties}>
            <Icon size={17} strokeWidth={1.7} />
            <span>{room.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function HouseFallback({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="house-fallback" aria-label="Illustrated house with eight rooms to explore" aria-hidden={hidden}>
      <div className="fallback-world-sky" />
      <div className="fallback-sun" />
      <div className="fallback-cloud fallback-cloud-one" />
      <div className="fallback-cloud fallback-cloud-two" />
      <div className="fallback-tree fallback-tree-left"><i /><i /><i /><b /></div>
      <div className="fallback-tree fallback-tree-right"><i /><i /><i /><b /></div>
      <div className="fallback-house">
        <div className="fallback-roof"><span /></div>
        <div className="fallback-house-frame">
          <div className="fallback-row-caption">UPSTAIRS · WORK, PLAY &amp; CURIOSITY</div>
          <RoomLinks slugs={upstairs} floor="upstairs" />
          <div className="fallback-row-caption">DOWNSTAIRS · MUSIC, LIFE &amp; EVERYTHING ELSE</div>
          <RoomLinks slugs={downstairs} floor="downstairs" />
          <div className="fallback-door" aria-hidden="true"><span /></div>
        </div>
      </div>
      <div className="fallback-path" />
      <div className="fallback-character" role="img" aria-label="A friendly fictional avatar waving hello">
        <i className="fallback-hair" /><i className="fallback-head" /><i className="fallback-eyes" /><i className="fallback-smile" />
        <i className="fallback-body" /><i className="fallback-arm" /><i className="fallback-leg fallback-leg-one" /><i className="fallback-leg fallback-leg-two" />
      </div>
      <div className="fallback-speech">Hey! I’m Shadman. Welcome in <span aria-hidden="true">✦</span></div>
      <div className="fallback-hint">Tap any room to step inside</div>
    </div>
  );
}
