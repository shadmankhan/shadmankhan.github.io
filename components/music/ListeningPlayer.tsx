"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowSquareOut, Headphones, MusicNotes, Play, VinylRecord, X } from "@phosphor-icons/react/ssr";
import { profile } from "@/content/public-profile";

const coverArt = [
  "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0283cefe8715e0f4eee27e8fa2",
  "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023720fdd917e0aec2c3c869e8",
];

type Provider = "spotify" | "youtube";

export function ListeningPlayer() {
  const [selected, setSelected] = useState(0);
  const [provider, setProvider] = useState<Provider | null>(null);
  const song = profile.songs[selected];

  return <div className="release-player">
    <div className="release-selector" role="tablist" aria-label="Choose a release">{profile.songs.map((release, index) => <button className="release-tab" key={release.title} type="button" role="tab" aria-selected={selected === index} onClick={() => { setSelected(index); setProvider(null); }}><span className="release-tab-cover"><Image src={coverArt[index]} alt="" fill sizes="52px" unoptimized /></span><span><small>SINGLE · NOT SHADMAN</small><strong>{release.title}</strong></span><span className="release-tab-arrow"><Play size={13} weight="fill" /></span></button>)}</div>
    <div className="release-stage">
      <div className="release-artwork"><Image src={coverArt[selected]} alt={`${song.title} cover artwork`} fill sizes="(max-width: 650px) 44vw, 240px" unoptimized priority /><div className="release-record" aria-hidden="true"><span><VinylRecord size={34} weight="duotone" /></span></div></div>
      <div className="release-story"><span className="eyebrow"><Headphones size={13} /> A RELEASE BY NOT SHADMAN</span><h3 className="display">{song.title}</h3><p>A song written and released under the name Not Shadman.</p><div className="release-actions"><button className="button-primary" type="button" onClick={() => setProvider("spotify")}><Play size={14} weight="fill" /> Listen here</button><a className="button-outline" href={song.youtube} target="_blank" rel="noreferrer">Watch on YouTube <ArrowSquareOut size={13} /></a></div><div className="release-direct-links"><a href={song.spotify} target="_blank" rel="noreferrer">Open on Spotify <ArrowSquareOut size={12} /></a><button className="release-load-youtube" type="button" onClick={() => setProvider("youtube")}>Load YouTube player</button></div></div>
    </div>
    {provider && <div className={`player-frame${provider === "youtube" ? " video" : ""}`}><div className="player-frame-head"><span>{provider === "spotify" ? "Spotify" : "YouTube"} · {song.title}</span><button className="icon-button" type="button" onClick={() => setProvider(null)} aria-label="Close music player"><X size={15} /></button></div><iframe key={`${provider}-${selected}`} src={provider === "spotify" ? song.spotifyEmbed : song.youtubeEmbed} title={`${song.title} on ${provider}`} loading="lazy" allow={provider === "spotify" ? "encrypted-media; picture-in-picture" : "picture-in-picture; encrypted-media"} referrerPolicy="strict-origin-when-cross-origin" /></div>}
    <p className="notice release-consent"><MusicNotes size={14} /> Your player only loads after you press a button. Spotify and YouTube may set their own cookies and availability can vary by region.</p>
  </div>;
}
