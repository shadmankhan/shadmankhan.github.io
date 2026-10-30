"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/ssr";

export function CopyHandle({ platform, handle }: { platform: string; handle: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(handle); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
    catch { setCopied(false); }
  };
  return <div className="mini-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: 15 }}><div><span className="eyebrow">{platform}</span><div style={{ fontWeight: 650, marginTop: 3 }}>{handle}</div></div><button type="button" className="copy-button" onClick={copy} aria-label={`Copy ${platform} handle ${handle}`}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}</button></div>;
}
