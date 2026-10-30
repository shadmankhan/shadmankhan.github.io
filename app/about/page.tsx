import Link from "next/link";
import { ArrowRight, ArrowSquareOut, ArrowUpRight, Envelope, GithubLogo, LinkedinLogo, Sparkle } from "@phosphor-icons/react/ssr";
import { RoomPage } from "@/components/shell/RoomPage";
import { profile } from "@/content/public-profile";

export default function AboutPage() {
  return <RoomPage slug="about" eyebrow="A little about me" title="Engineer by trade. Curious by default." description="I’m Shadman: a Lucknow-based full-stack software engineer who likes building useful things and staying curious about everything around them.">
    <section className="about-intro"><div className="about-intro-mark" aria-hidden="true"><span>S</span><i>✳</i></div><div className="about-intro-copy"><span className="eyebrow">HELLO, PROPERLY</span><h2>{profile.role}<span> · Lucknow, India</span></h2><p>{profile.about}</p><p>{profile.aboutMore}</p><div className="about-contacts"><a className="about-contact-primary" href={`mailto:${profile.email}?subject=Hello%20Shadman`}><Envelope size={16} /> Start a conversation <ArrowUpRight size={14} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo size={17} /> LinkedIn <ArrowSquareOut size={13} /></a><a href={profile.github} target="_blank" rel="noreferrer"><GithubLogo size={17} /> GitHub <ArrowSquareOut size={13} /></a></div></div></section>

    <section className="about-career"><div className="about-career-head"><span className="eyebrow">THE WORK THREAD</span><h2>One thing led to another.</h2><p>{profile.professional.experienceSummary} of full-stack engineering, self-reported in the profile.</p></div><div className="about-career-list">{profile.professional.work.map((item, index) => <article className="about-career-item" key={item.employer}><div className="about-career-marker"><span>0{index + 1}</span><i /></div><div><span className="eyebrow">{item.dates}</span><h3>{item.role}<span> at </span>{item.employer}</h3><p>{item.summary}</p><div className="tag-row">{item.tags.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></article>)}</div></section>

    <section className="about-next"><div><span className="eyebrow"><Sparkle size={13} /> THE NEXT CHAPTER</span><h2>Interested in thoughtful work.</h2><p>I’m interested in senior full-stack and applied AI engineering opportunities, especially work that values clear thinking and useful outcomes.</p><a className="link-text" href={`mailto:${profile.email}?subject=Résumé%20request`}>Ask me for a current résumé <ArrowUpRight size={13} /></a></div><Link className="about-explore" href="/studio"><span><strong>See the coding studio</strong><small>Selected skills, experience and public GitHub activity</small></span><ArrowRight size={18} /></Link></section>
  </RoomPage>;
}
