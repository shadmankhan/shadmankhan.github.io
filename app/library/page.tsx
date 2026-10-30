import Image from "next/image";
import { ArrowSquareOut, BookOpen, FileText } from "@phosphor-icons/react/ssr";
import { RoomPage } from "@/components/shell/RoomPage";
import { profile } from "@/content/public-profile";

export default function LibraryPage() {
  return <RoomPage slug="library" eyebrow="Library & research" title="A book within reach." description="Research in one stack, a novel in the other, and a small lamp still on.">
    <section className="library-open-book"><a className="library-book-cover" href="https://openlibrary.org/isbn/9780451191151" target="_blank" rel="noreferrer" aria-label="View The Fountainhead on Open Library"><Image src="https://covers.openlibrary.org/b/isbn/9780451191151-L.jpg?default=false" alt="The Fountainhead by Ayn Rand book cover" fill sizes="(max-width: 680px) 72vw, 310px" /></a><div className="library-book-copy"><span className="eyebrow"><BookOpen size={14} /> CURRENTLY ON THE DESK</span><h2 className="display">{profile.currentBook.title}</h2><p className="library-author">By {profile.currentBook.author}</p><p>Current read from my profile snapshot. I’ll let the book speak for itself; no review written just to fill a shelf.</p><a className="link-text" href="https://openlibrary.org/isbn/9780451191151" target="_blank" rel="noreferrer">Book details <ArrowSquareOut size={13} /></a></div><span className="library-page-mark" aria-hidden="true">01 / OPEN</span></section>

    <section className="library-papers"><div className="library-papers-heading"><div><span className="eyebrow">THE RESEARCH SHELF</span><h2>Two papers, in the record.</h2></div><p>Publication links lead directly to each DOI record.</p></div><div className="library-paper-list">{profile.publications.map((publication, index) => <article className="library-paper" key={publication.title}><span className="library-paper-index">0{index + 1}</span><div><span className="pill"><FileText size={13} /> Paper · {publication.year}</span><h3>{publication.title}</h3><p>{publication.journal}</p></div><a href={publication.url} target="_blank" rel="noreferrer" aria-label={`Open ${publication.title}`}><ArrowSquareOut size={18} /></a></article>)}</div></section>

    <div className="library-endnote"><span className="eyebrow">KEEP THE MARGINS OPEN</span><p>Software engineering, AI, reading, research and unfamiliar ideas all find their way onto the same desk.</p></div>
  </RoomPage>;
}
