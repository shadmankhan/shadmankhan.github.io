import type { Icon } from "@phosphor-icons/react";
import { BookOpen, Car, Code, GameController, Leaf, MapTrifold, MusicNotes, User } from "@phosphor-icons/react/ssr";

export type Room = { slug: string; title: string; short: string; label: string; color: string; pale: string; icon: Icon };

export const rooms: Room[] = [
  { slug: "studio", title: "Coding studio", label: "Studio", short: "Work, engineering & AI", color: "#7160a5", pale: "#ece7f6", icon: Code },
  { slug: "arcade", title: "Game room", label: "Arcade", short: "Games, creators & current quests", color: "#c8786d", pale: "#f6e5e1", icon: GameController },
  { slug: "music", title: "Music room", label: "Music", short: "Independent songs as Not Shadman", color: "#8771a2", pale: "#eee8f5", icon: MusicNotes },
  { slug: "library", title: "Library", label: "Library", short: "Research papers & current reading", color: "#ac824a", pale: "#f6efdf", icon: BookOpen },
  { slug: "journeys", title: "Travel wall", label: "Journeys", short: "Places that made it into the story", color: "#6683a0", pale: "#e6eef5", icon: MapTrifold },
  { slug: "garage", title: "Garage", label: "Garage", short: "Cars, driving & a little gear toy", color: "#6d6687", pale: "#e9e6f1", icon: Car },
  { slug: "garden", title: "Life garden", label: "Garden", short: "Friends, swimming & side quests", color: "#b27694", pale: "#f5e8f0", icon: Leaf },
  { slug: "about", title: "About me", label: "About", short: "The person behind the rooms", color: "#b56f5f", pale: "#f6e6e1", icon: User }
];
