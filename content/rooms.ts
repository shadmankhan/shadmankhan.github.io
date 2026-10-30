import type { LucideIcon } from "lucide-react";
import { BookOpen, CarFront, Code2, Gamepad2, Leaf, Map, Music2, UserRound } from "lucide-react";

export type Room = { slug: string; title: string; short: string; label: string; color: string; pale: string; icon: LucideIcon };

export const rooms: Room[] = [
  { slug: "studio", title: "Coding studio", label: "Studio", short: "Ideas, interfaces & experiments", color: "#77947f", pale: "#e4eee3", icon: Code2 },
  { slug: "arcade", title: "Game room", label: "Arcade", short: "A tiny matching game awaits", color: "#bd7d64", pale: "#f4e1d7", icon: Gamepad2 },
  { slug: "music", title: "Listening room", label: "Music", short: "Two songs from Not Shadman", color: "#9d7d9a", pale: "#eee5ef", icon: Music2 },
  { slug: "library", title: "Library & research", label: "Library", short: "Papers, notes & current read", color: "#a48c58", pale: "#f4edcf", icon: BookOpen },
  { slug: "journeys", title: "Travel wall", label: "Journeys", short: "Places visited, no dates invented", color: "#62899b", pale: "#e1edf0", icon: Map },
  { slug: "garage", title: "Driving corner", label: "Garage", short: "A calm, fictional gear toy", color: "#667f7d", pale: "#e2ece9", icon: CarFront },
  { slug: "garden", title: "Life garden", label: "Garden", short: "A few things beyond the screen", color: "#748d6c", pale: "#e4eddf", icon: Leaf },
  { slug: "about", title: "The short version", label: "About", short: "For the straight-to-the-point visit", color: "#b27e69", pale: "#f2e6dc", icon: UserRound }
];
