import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code, GithubLogo, Sparkle, Star } from "@phosphor-icons/react/ssr";
import { HouseScene } from "@/components/world/HouseScene";
import { RoomExplorer } from "@/components/world/RoomExplorer";
import { profile } from "@/content/public-profile";

export default function HomePage() {
  return (
    <div className="world-home home-universe">
      <section className="arrival-stage content-width" aria-labelledby="arrival-title">
        <div className="arrival-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="arrival-moon" aria-hidden="true" />
        <div className="arrival-orbit arrival-orbit-one" aria-hidden="true" />
        <div className="arrival-orbit arrival-orbit-two" aria-hidden="true" />

        <div className="arrival-topline"><span><span className="arrival-live-dot" /> A SMALL WORLD, OPEN DOOR</span><span>LUCKNOW · INDIA <Sparkle size={13} weight="fill" /></span></div>
        <div className="arrival-layout">
          <div className="arrival-copy">
            <span className="arrival-kicker"><Star size={13} weight="fill" /> SOFTWARE ENGINEER · MUSIC MAKER · PLAYER</span>
            <h1 id="arrival-title">I build software.<br /><span>Curiosity fills the rest.</span></h1>
            <p>Hey, I’m Shadman. I make full-stack products, write songs as Not Shadman, wander into game worlds, and take the long way home. <strong>This is where it all lives.</strong></p>
            <div className="arrival-actions">
              <Link className="arrival-primary" href="#rooms">Wander through my world <ArrowDown size={16} weight="bold" /></Link>
              <Link className="arrival-secondary" href="/studio"><Code size={16} /> See my work <ArrowUpRight size={14} /></Link>
            </div>
            <div className="arrival-handwritten"><span>✳</span> The work matters. So does everything around it.</div>
          </div>

          <div className="arrival-visual" aria-label="A miniature house with eight clickable rooms">
            <div className="arrival-visual-halo" aria-hidden="true" />
            <HouseScene />
            <div className="arrival-hello" role="note" aria-label="A little character says: Hey, I'm Shadman. Welcome to my world.">
              <span className="hello-puppet" aria-hidden="true"><i className="hello-hair" /><i className="hello-face" /><i className="hello-eye" /><i className="hello-body" /><i className="hello-arm" /></span>
              <span><small>YOUR HOST</small><strong>Hey, I’m Shadman!<br />Welcome to my world.</strong></span>
              <span className="hello-star" aria-hidden="true">✦</span>
            </div>
            <div className="arrival-scene-caption"><span>Eight rooms. No wrong door.</span><span><span className="scene-pulse" /> TAP A WINDOW TO WANDER</span></div>
          </div>
        </div>
        <Link className="arrival-scroll" href="#rooms" aria-label="Scroll to choose a room"><span>THE HOUSE TOUR</span><ArrowDown size={14} /></Link>
      </section>

      <div id="rooms" className="content-width home-explorer-wrap"><RoomExplorer /></div>

      <section className="content-width home-signoff" aria-label="Contact Shadman">
        <div className="home-signoff-copy"><span className="home-section-eyebrow"><Sparkle size={13} weight="fill" /> WHEN YOU GET TO THE FRONT DOOR</span><h2 className="display">Want to make<br /><em>something useful?</em></h2><p>I’m a full-stack software engineer, open to thoughtful conversations, good questions, and interesting work.</p></div>
        <div className="home-signoff-actions">
          <Link className="arrival-primary" href="/about">The short version <ArrowUpRight size={15} /></Link>
          <a className="home-quick-link" href={`mailto:${profile.email}?subject=Hello%20Shadman`}>Say hello <ArrowUpRight size={14} /></a>
          <a className="home-quick-link" href={profile.github} target="_blank" rel="noreferrer"><GithubLogo size={16} /> GitHub <ArrowUpRight size={14} /></a>
        </div>
      </section>
    </div>
  );
}
