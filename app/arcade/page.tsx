import { GameController, Sparkle } from "@phosphor-icons/react/ssr";
import { RoomPage, Section } from "@/components/shell/RoomPage";
import { ArcadeWorlds } from "@/components/games/ArcadeWorlds";
import { ArcadeMiniGame } from "@/components/games/ArcadeMiniGame";
import { CopyHandle } from "@/components/games/CopyHandle";
import { profile } from "@/content/public-profile";

export default function ArcadePage() {
  return <RoomPage slug="arcade" eyebrow="Game room" title="One more turn." description="Big worlds, good stories, controller within reach. This is my corner for getting wonderfully lost.">
    <Section className="arcade-world-section"><div className="arcade-section-intro"><div><span className="eyebrow"><GameController size={14} /> CURRENTLY ON THE SCREEN</span><h2 className="display">Pick a world to drift into.</h2></div><span className="arcade-live-badge"><i /> SAVE SLOT OPEN</span></div><ArcadeWorlds /></Section>

    <section className="arcade-quick-run"><div className="arcade-run-visual" aria-hidden="true"><span>✦</span><span>✳</span><span>✧</span><i /><i /><i /></div><div className="arcade-run-copy"><span className="eyebrow"><Sparkle size={13} /> A QUICK SIDE QUEST</span><h2>Match the little emblems.</h2><p>No timer, no scoreboards. Just a pocket-size break between quests.</p></div><div className="arcade-run-game"><ArcadeMiniGame /></div></section>

    <div className="arcade-social-row"><div><span className="eyebrow">FIND ME IN THE LOBBY</span><h2>My player handles.</h2><p>Here when I’m playing, if you want to say hi.</p></div><div className="arcade-handle-list"><CopyHandle platform="PlayStation Network" handle={profile.gaming.psn} /><CopyHandle platform="Steam · display name Lucifer" handle={profile.gaming.steam} /><CopyHandle platform="Epic Games" handle={profile.gaming.epic} /><CopyHandle platform="Gaming YouTube" handle={profile.gaming.youtube} /></div><div className="arcade-creators">Game nights also feature: {profile.gaming.creators.join(" and ")}.</div></div>
  </RoomPage>;
}
