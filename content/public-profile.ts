export const profile = {
  name: "Shadman Ahmed Khan",
  shortName: "Shadman",
  location: "Lucknow, India",
  email: "contactshadman@gmail.com",
  linkedin: "https://www.linkedin.com/in/shadmanakhan/",
  github: "https://github.com/shadmankhan",
  role: "Full-stack software engineer",
  intro: "I build useful software, make music, play games, and keep a few side quests running. This is the little home where they all meet.",
  about: "I’m a Lucknow-based full-stack software engineer who enjoys making thoughtful interfaces and systems that help people find their way through complex information. My work has moved between enterprise products, search-heavy experiences, APIs, and conversational interfaces.",
  aboutMore: "Outside work, I make music as Not Shadman, play a lot of games, read, travel with friends, and take the scenic route whenever I can. I use AI tools in my day-to-day engineering work and keep learning about the field; this site keeps those interests in one place.",
  professional: {
    experienceSummary: "6+ years in full-stack engineering (self-reported in the supplied profile)",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "REST APIs", "GraphQL", "Redux", "React Query", "OpenSearch", "Elasticsearch", "PostgreSQL", "MongoDB", "AWS", "Jest", "Playwright"],
    work: [
      { employer: "Norstella India", role: "Software Engineer", dates: "Jun 2024 – Oct 2026", summary: "Rebuilt a search-focused product area with React and TypeScript, working across REST APIs, OpenSearch/Elasticsearch, Redux and React Query. Also contributed to data visualizations, testing and release workflows.", tags: ["React", "TypeScript", "OpenSearch", "React Query", "AWS"] },
      { employer: "Team Geek Solutions", role: "Software Engineer", dates: "Sep 2020 – May 2024", summary: "Built React and Node.js applications, conversational interfaces, multilingual features, API integrations and reusable mobile-first components across client projects.", tags: ["React", "Node.js", "Next.js", "Dialogflow", "NestJS"] }
    ],
    ai: { handsOn: ["Dialogflow", "Alexa skills", "Facebook Messenger chatbots", "AI-assisted development with Claude and OpenAI Codex"], learning: ["Generative AI", "LLMs", "RAG", "Embeddings", "Evaluation", "Grounding", "Tool calling"] }
  },
  repositories: [
    { name: "fullstack-reddit", description: "A full-stack side project exploring a social feed.", url: "https://github.com/shadmankhan/fullstack-reddit", tags: ["Next.js", "GraphQL", "PostgreSQL"] },
    { name: "software-engineering-frontend-interview", description: "Frontend notes, JavaScript patterns, UI problems and system design questions.", url: "https://github.com/shadmankhan/software-engineering-frontend-interview", tags: ["JavaScript", "Notes"] },
    { name: "buyAndSell-reactApp", description: "A buy-and-sell app with authentication, listings and a cart.", url: "https://github.com/shadmankhan/buyAndSell-reactApp", tags: ["React", "Node.js", "MongoDB"] },
    { name: "mini-admin-dashboard-table", description: "A JavaScript dashboard and table experiment.", url: "https://github.com/shadmankhan/mini-admin-dashboard-table", tags: ["JavaScript", "UI"] },
    { name: "grpc-todo-list", description: "A todo app exploring gRPC unary and streaming RPCs.", url: "https://github.com/shadmankhan/grpc-todo-list", tags: ["gRPC", "Node.js"] }
  ],
  songs: [
    { title: "Reh Ja", spotify: "https://open.spotify.com/track/4KGeqjj4uwvT6XwZFAml81", spotifyEmbed: "https://open.spotify.com/embed/track/4KGeqjj4uwvT6XwZFAml81", youtube: "https://youtu.be/eNYNY9peb60", youtubeEmbed: "https://www.youtube-nocookie.com/embed/eNYNY9peb60?autoplay=0" },
    { title: "Dhuen Ki Lakeerein", spotify: "https://open.spotify.com/track/3OgLsngjI4HuTwlby2t0ti", spotifyEmbed: "https://open.spotify.com/embed/track/3OgLsngjI4HuTwlby2t0ti", youtube: "https://youtu.be/Fu_T6Jl2CZw", youtubeEmbed: "https://www.youtube-nocookie.com/embed/Fu_T6Jl2CZw?autoplay=0" }
  ],
  artist: { name: "Not Shadman", spotify: "https://open.spotify.com/artist/2EBQ9x0MEeygBqgj4VQ7kE", youtube: "https://www.youtube.com/@not.shadman", instagram: "https://www.instagram.com/not.shadman/" },
  favoriteArtists: ["Murtaza Qizilbash", "Samar Jafir", "Rahat Fateh Ali Khan", "Atif Aslam", "Sonu Nigam", "Arijit Singh", "Shreya Ghoshal"],
  gaming: { current: "Final Fantasy XVI", next: "The Witcher 3", psn: "theShadyLucifer", steam: "shadmanakhan", steamName: "Lucifer", epic: "theShadyLucifer", youtube: "theShadyLucifer", creators: ["theRadBrad", "Battleking"] },
  publications: [
    { title: "Sign Translation Via Natural Language Processing", year: "2021", journal: "Asian Journal of Research in Computer Science", url: "https://doi.org/10.9734/ajrcos/2021/v11i130251" },
    { title: "Fastest Growing Waste: E-waste", year: "2020", journal: "Asian Journal of Advanced Research and Reports", url: "https://doi.org/10.9734/ajarr/2020/v11i130255" }
  ],
  currentBook: { title: "The Fountainhead", author: "Ayn Rand" },
  places: ["Lucknow", "Belfast", "London", "Edinburgh", "Scottish Highlands", "Udaipur", "Jaipur", "Manali", "Shimla", "Jibhi", "Nainital", "Mumbai", "Hyderabad", "Bengaluru"],
  car: { make: "Škoda", model: "Slavia", engine: "1.0 TSI", fuel: "Petrol", transmission: "Manual", color: "Black" }
} as const;

export type RoomSlug = "studio" | "arcade" | "music" | "library" | "journeys" | "garage" | "garden" | "about";
