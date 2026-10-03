import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Sparkles, Gamepad2, Clapperboard, Users } from "lucide-react";
import { getRobloxAvatar, getRobloxUser } from "@/lib/roblox.functions";
import { getTikTokFollowers } from "@/lib/tiktok.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio · CL-X Comunidad Roblox" },
      {
        name: "description",
        content:
          "Bienvenido a CL-X, una comunidad unida de creadores de contenido de Roblox.",
      },
      { property: "og:title", content: "Inicio · CL-X Comunidad Roblox" },
      {
        property: "og:description",
        content:
          "Una comunidad unida de creadores de contenido de Roblox.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FOLLOWER_FALLBACKS: Record<string, number> = {
  claasix: 12500,
  mazzi1nky: 0,
  cwtusagi: 0,
};

type CreatorProfile = {
  id: string;
  displayName: string;
  robloxUserId: string;
  robloxUsername: string;
  bio: string;
  tiktokUsername: string;
  discordHandle: string;
  role: string;
  tags: string[];
};

const CREATORS: CreatorProfile[] = [
  {
    id: "classix",
    displayName: "classix",
    robloxUserId: "5321645648",
    robloxUsername: "cl6zy",
    bio: "Desarrollador de experiencias en Roblox y creador de contenido.",
    tiktokUsername: "claasix",
    discordHandle: "@cl6zy",
    role: "Creador de Contenido",
    tags: ["Contenido"],
  },
  {
    id: "mazzi",
    displayName: "Mazzi",
    robloxUserId: "4999897326",
    robloxUsername: "maxplis123",
    bio: "Creador de contenido de Roblox, creciendo cada dia mas",
    tiktokUsername: "mazzi1nky",
    discordHandle: "",
    role: "Creador de Contenido",
    tags: ["Contenido"],
  },
  {
    id: "usagi",
    displayName: "Usagi",
    robloxUserId: "2561103592",
    robloxUsername: "cwtusagi",
    bio: "Creadora de contenido y outfits de Roblox.",
    tiktokUsername: "cwtusagi",
    discordHandle: "",
    role: "Creadora de Contenido",
    tags: ["Contenido", "Creadora de Outfits"],
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.319 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.291.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function useRobloxAvatar(userId: string) {
  const cacheKey = `clx-avatar-${userId}`;

  const { data: avatar } = useQuery({
    queryKey: ["roblox-avatar", userId],
    queryFn: async () => {
      const r = await getRobloxAvatar({ data: { userId } });
      if (!r.imageUrl) throw new Error("avatar no disponible");
      return r;
    },
    retry: 5,
    retryDelay: (n) => Math.min(2000 * 2 ** n, 30000),
    refetchInterval: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });

  const [cachedAvatar, setCachedAvatar] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      setCachedAvatar(window.localStorage.getItem(cacheKey));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [cacheKey]);

  useEffect(() => {
    if (avatar?.imageUrl) {
      setBroken(false);
      try {
        window.localStorage.setItem(cacheKey, avatar.imageUrl);
      } catch {
        /* almacenamiento no disponible */
      }
    }
  }, [avatar?.imageUrl, cacheKey]);

  const avatarSrc = (!broken && avatar?.imageUrl) || cachedAvatar || null;

  return { avatarSrc, cachedAvatar, setBroken };
}

function useRobloxDisplayName(userId: string, fallback: string) {
  const { data } = useQuery({
    queryKey: ["roblox-user", userId],
    queryFn: async () => {
      const r = await getRobloxUser({ data: { userId } });
      return r;
    },
    retry: 3,
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
  });

  return data?.displayName?.trim() || fallback;
}

function useTikTokFollowers(username: string) {
  const { data: tiktok } = useQuery({
    queryKey: ["tiktok-followers", username],
    queryFn: () => getTikTokFollowers({ data: { username } }),
    refetchInterval: 24 * 60 * 60 * 1000,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const fallback = FOLLOWER_FALLBACKS[username] ?? 0;
  return tiktok?.followers ?? fallback;
}

function ProfileCard({ creator }: { creator: CreatorProfile }) {
  const { avatarSrc, cachedAvatar, setBroken } = useRobloxAvatar(creator.robloxUserId);
  const displayName = useRobloxDisplayName(creator.robloxUserId, creator.displayName);
  const followerCount = useTikTokFollowers(creator.tiktokUsername);
  const robloxProfileUrl = `https://www.roblox.com/users/${creator.robloxUserId}/profile`;

  return (
    <section
      className="glass-card relative w-full rounded-lg p-5 shadow-card sm:p-6"
      aria-label={`Perfil de ${displayName}`}
    >
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent" />

      <div className="flex justify-center">
        <span className="badge-role inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
          <Sparkles className="h-3.5 w-3.5" />
          {creator.role}
        </span>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-glow via-glow to-cyan-glow opacity-70 blur-md" />
          <a
            href={robloxProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-edge bg-surface transition duration-300 hover:scale-105 hover:border-glow/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label={`Ver perfil de Roblox de ${creator.robloxUsername}`}
            title={`Perfil de Roblox · ${creator.robloxUsername}`}
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={`Avatar de Roblox de ${creator.robloxUsername}`}
                className="h-full w-full object-cover"
                onError={() => {
                  if (cachedAvatar && avatarSrc !== cachedAvatar) setBroken(true);
                }}
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-surface" />
            )}
          </a>
          <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-glow to-violet-glow shadow-glow-sm">
            <BadgeCheck className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {displayName}
        </h2>
        <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Gamepad2 className="h-4 w-4 text-glow" />
          Roblox ID:{" "}
          <a
            href={robloxProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/90 underline-offset-2 hover:text-glow hover:underline"
          >
            {creator.robloxUsername}
          </a>
        </p>
      </div>

      <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
        {creator.bio}
      </p>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {creator.tags.map((tag) => (
          <span
            key={tag}
            className="chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          >
            <Clapperboard className="h-3.5 w-3.5 text-cyan-glow" /> {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-edge bg-surface/60 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Seguidores totales
            </p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums text-foreground">
              {followerCount.toLocaleString("en-US")}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-glow/20 to-violet-glow/20 text-glow">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div
        className={`mt-4 grid gap-2 ${
          creator.discordHandle ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        <a
          href={`https://www.tiktok.com/@${creator.tiktokUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-social group"
        >
          <TikTokIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span className="btn-social-text">
            <span className="btn-social-label">TikTok</span>
            <span className="btn-social-handle">@{creator.tiktokUsername}</span>
          </span>
        </a>

        {creator.discordHandle ? (
          <div
            className="btn-social cursor-default select-text"
            aria-label={`Discord: ${creator.discordHandle}`}
          >
            <DiscordIcon className="h-4 w-4 shrink-0 text-[#8b93a7]" />
            <span className="btn-social-text">
              <span className="btn-social-label">Discord</span>
              <span className="btn-social-handle">{creator.discordHandle}</span>
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="page-shell space-y-8">
      <section className="max-w-3xl">
        <p className="section-kicker">Bienvenido a CL-X</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
          Una comunidad unida de creadores de contenido de Roblox
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Compartimos ideas, creamos experiencias y crecemos juntos dentro del mundo de Roblox.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-5 xl:gap-6">
        {CREATORS.map((creator) => (
          <ProfileCard key={creator.id} creator={creator} />
        ))}
      </div>
    </main>
  );
}
