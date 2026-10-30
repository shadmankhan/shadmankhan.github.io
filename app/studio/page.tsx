import Link from "next/link";
import { ArrowSquareOut, GitBranch, Lamp } from "@phosphor-icons/react/ssr";
import { RoomPage, Section } from "@/components/shell/RoomPage";
import { LogicPuzzle } from "@/components/studio/LogicPuzzle";
import { GitHubGarden } from "@/components/studio/GitHubGarden";
import { profile } from "@/content/public-profile";

export default function StudioPage() {
  return <RoomPage slug="studio" eyebrow="Coding studio" title="Software, made useful." description="I’m a full-stack software engineer drawn to clear interfaces, thoughtful systems and the small details that help a product click.">
    <section className="studio-intro-band"><div><span className="eyebrow">MY KIND OF PROBLEM</span><h2>Make the complex feel clear.</h2></div><p>From search-heavy interfaces and APIs to conversational experiences, I like bringing product thinking and engineering into the same room.</p><div className="studio-stack" aria-label="Selected technologies">{["React", "TypeScript", "Next.js", "Node.js", "OpenSearch", "AWS"].map((item) => <span key={item}>{item}</span>)}</div></section>

    <section className="studio-workbench"><div className="studio-work-heading"><div><span className="eyebrow">WORKBENCH · 2020 — NOW</span><h2>Things I’ve helped bring to life.</h2></div><Link className="link-text" href="/about">Full background <ArrowSquareOut size={13} /></Link></div>
      <div className="studio-timeline">{profile.professional.work.map((item, index) => <article className="studio-job" key={item.employer}><div className="studio-job-index"><span>0{index + 1}</span><i /></div><div className="studio-job-copy"><span className="eyebrow">{item.role} · {item.dates}</span><h3>{item.employer}</h3><p>{item.summary}</p><div className="tag-row">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></article>)}</div>
      <p className="studio-confidential-note">Experience summaries are high-level. No internal product details or confidential work are included.</p>
    </section>

    <section className="studio-ai-strip"><div className="studio-ai-icon"><Lamp size={28} weight="duotone" /></div><div><span className="eyebrow">TOOLS, WITH THE RIGHT-SIZED CLAIM</span><h2>Hands-on practice. Plenty still to learn.</h2><p>Practical experience includes Dialogflow, Alexa skills, chatbots and AI-assisted development. LLMs, RAG, embeddings and agentic workflows remain areas of active learning—not claimed production deployments.</p></div><div className="studio-ai-tags"><strong>Used</strong><div className="tag-row">{profile.professional.ai.handsOn.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><strong>Exploring</strong><div className="tag-row">{profile.professional.ai.learning.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></section>

    <section className="studio-activity-section"><GitHubGarden /></section>

    <div className="studio-side-quests"><Section className="studio-projects"><div className="studio-work-heading"><div><span className="eyebrow">SIDE PROJECTS</span><h2>Little things on GitHub.</h2></div><a className="link-text" href={profile.github} target="_blank" rel="noreferrer">All of GitHub <ArrowSquareOut size={13} /></a></div><div className="studio-project-list">{profile.repositories.slice(0, 4).map((repo) => <a className="studio-project" href={repo.url} target="_blank" rel="noreferrer" key={repo.name}><span className="studio-project-mark"><GitBranch size={17} /></span><span><strong>{repo.name}</strong><small>{repo.description}</small></span><ArrowSquareOut size={14} /></a>)}</div></Section><div className="studio-puzzle-wrap"><LogicPuzzle /></div></div>

    <Section className="studio-tool-shelf"><span className="eyebrow">A selection of tools I reach for</span><div className="tag-row">{profile.professional.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div><p>Selection, not a proficiency ranking; languages marked as exposure in the source profile are left out.</p></Section>
  </RoomPage>;
}
