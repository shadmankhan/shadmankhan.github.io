import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { RoomPage, Section } from "@/components/shell/RoomPage";
import { DriveArcade } from "@/components/garage/DriveArcade";

export default function GaragePage() {
  return <RoomPage slug="garage" eyebrow="Driving corner" title="The long way home." description="A winding road, a good song, and one extra turn before the driveway. Take the wheel for a minute.">
    <Section className="garage-arcade-section"><DriveArcade /></Section>
    <section className="garage-car-note"><div className="garage-car-note-copy"><span className="eyebrow">A LITTLE EVERYDAY JOY</span><h2>The black Slavia.</h2><p>My everyday ride, in a reference image.</p><a href="https://www.autocarindia.com/cars/skoda/slavia/images/color-deep-black" target="_blank" rel="noreferrer">See the Slavia in Deep Black <ArrowUpRight size={13} /></a></div><div className="garage-car-image"><Image src="/assets/rooms/slavia-deep-black.png" alt="Reference image of a Škoda Slavia in Deep Black" fill sizes="(max-width: 700px) 90vw, 460px" /><span>ŠKODA SLAVIA · DEEP BLACK</span></div></section>
  </RoomPage>;
}
