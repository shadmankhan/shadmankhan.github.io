import { ArrowSquareOut, MusicNotes, VinylRecord } from "@phosphor-icons/react/ssr";
import { RoomPage, Section } from "@/components/shell/RoomPage";
import { ListeningPlayer } from "@/components/music/ListeningPlayer";
import { TuneEcho } from "@/components/music/TuneEcho";
import { profile } from "@/content/public-profile";

export default function MusicPage() {
  return <RoomPage slug="music" eyebrow="Listening room · Not Shadman" title="Songs for the in-between." description="A little writing, a little recording, and a few melodies that found their way out into the world.">
    <Section className="music-record-section"><div className="music-section-heading"><div><span className="eyebrow"><VinylRecord size={14} /> THE RELEASE SHELF</span><h2 className="display">Pick a song. Settle in.</h2><p>Listen when you’re ready; nothing starts until you press play.</p></div><div className="music-spin-disc" aria-hidden="true"><span /></div></div><ListeningPlayer /></Section>
    <Section className="music-tune-section"><TuneEcho /></Section>
    <div className="music-afterglow"><div><span className="eyebrow">THE PERSON MAKING THE SONGS</span><h2>Not Shadman, on the internet.</h2><p>Independent releases and a few familiar voices that keep finding their way into the rotation.</p></div><div className="music-links"><a href={profile.artist.spotify} target="_blank" rel="noreferrer"><MusicNotes size={17} /> Spotify <ArrowSquareOut size={13} /></a><a href={profile.artist.youtube} target="_blank" rel="noreferrer"><MusicNotes size={17} /> YouTube <ArrowSquareOut size={13} /></a><a href={profile.artist.instagram} target="_blank" rel="noreferrer"><MusicNotes size={17} /> Instagram <ArrowSquareOut size={13} /></a></div><div className="music-favorites"><span className="eyebrow">CURRENTLY IN THE MIX</span><div className="tag-row">{profile.favoriteArtists.map((artist) => <span className="tag" key={artist}>{artist}</span>)}</div></div></div>
  </RoomPage>;
}
