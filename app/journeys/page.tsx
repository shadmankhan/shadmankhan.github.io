import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { RoomPage, Section } from "@/components/shell/RoomPage";
import { TravelMap } from "@/components/travel/TravelMap";
import { PostcardWall } from "@/components/travel/PostcardWall";

export default function JourneysPage() {
  return <RoomPage slug="journeys" eyebrow="Travel wall" title="Pins on the map, not a schedule." description="A few places that have made it into the story so far. The postcards are drawn, not personal travel photos.">
    <Section><span className="eyebrow">A map, softly marked</span><h2>Pick a pin or a postcard.</h2><p>Tap any point or name to see its label. Lucknow is the home base.</p><div style={{ marginTop: 18 }}><TravelMap /></div></Section>
    <Section><div className="two-col" style={{ alignItems: "center" }}><div><span className="eyebrow">Postcards, no dates attached</span><h2 className="display">Belfast, London, Scotland.<br />Udaipur, Jibhi, and more.</h2><p>Places listed from memory notes, without inventing trip dates or stories.</p></div><PostcardWall /></div><a className="link-text" href="mailto:contactshadman@gmail.com?subject=Postcard%20exchange" style={{ marginTop: 20 }}>Swap a postcard <ArrowUpRight size={13} /></a></Section>
  </RoomPage>;
}
