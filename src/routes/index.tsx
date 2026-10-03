import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Sparkles, Gamepad2, Code2, Clapperboard, Users } from "lucide-react";
import { getRobloxAvatar } from "@/lib/roblox.functions";
import avatarImg from "@/assets/avatar.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "cl6zy · Perfil de Creador Roblox" },
      {
        name: "description",
        content:
          "Perfil oficial de cl6zy — desarrollador de experiencias en Roblox, programador en Luau y creador de contenido.",
      },
      { property: "og:title", content: "cl6zy · Perfil de Creador Roblox" },
      {
        property: "og:description",
        content:
          "Desarrollador de experiencias en Roblox, programador en Luau y creador de contenido.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ============================================================
   ⭐ EDITA AQUÍ — Actualiza este número cada día (sin comas)
   ============================================================ */
const FOLLOWER_COUNT = 12500;

/* Iconos de marcas (no existen en lucide-react) */
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

function Index() {
  // Avatar de Roblox en vivo: se actualiza automáticamente cada 15 minutos
  const { data: avatar } = useQuery({
    queryKey: ["roblox-avatar"],
    queryFn: () => getRobloxAvatar(),
    refetchInterval: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });
  const avatarSrc = avatar?.imageUrl ?? avatarImg;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 font-sans text-foreground">
      {/* Fondo: halos de luz */}
      <div className="pointer-events-none absolute -left-48 -top-48 h-[34rem] w-[34rem] animate-blob rounded-full bg-violet-glow/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[34rem] w-[34rem] animate-blob-slow rounded-full bg-glow/20 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[120px]" />

      {/* Tarjeta de perfil */}
      <main className="glass-card relative z-10 w-full max-w-md rounded-4xl p-8 shadow-card">
        {/* Línea superior de brillo */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent" />

        {/* Insignia de rol */}
        <div className="flex justify-center">
          <span className="badge-role inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <Sparkles className="h-3.5 w-3.5" />
            Creador de Contenido
          </span>
        </div>

        {/* Avatar con anillo y sello verificado */}
        <div className="mt-7 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-glow via-glow to-cyan-glow opacity-70 blur-md" />
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-edge bg-surface">
              <img
                src={avatarImg}
                alt="Avatar de cl6zy"
                className="h-full w-full scale-110 object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-glow to-violet-glow shadow-glow-sm">
              <BadgeCheck className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Nombre de usuario / Roblox ID */}
        <div className="mt-5 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
            cl6zy
          </h1>
          <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Gamepad2 className="h-4 w-4 text-glow" />
            Roblox ID: <span className="font-medium text-foreground/90">cl6zy</span>
          </p>
        </div>

        {/* Biografía */}
        <p className="mt-5 text-center text-[15px] leading-relaxed text-muted-foreground">
          Desarrollador de experiencias en Roblox, programador en Luau y creador de contenido.
        </p>

        {/* Etiquetas de habilidades */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <Code2 className="h-3.5 w-3.5 text-violet-glow" /> Luau
          </span>
          <span className="chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <Gamepad2 className="h-3.5 w-3.5 text-glow" /> Roblox Studio
          </span>
          <span className="chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <Clapperboard className="h-3.5 w-3.5 text-cyan-glow" /> Contenido
          </span>
        </div>

        {/* Estadísticas */}
        <div className="mt-7 rounded-3xl border border-edge bg-surface/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Seguidores totales
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums text-foreground">
                {FOLLOWER_COUNT.toLocaleString("en-US")}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-glow/20 to-violet-glow/20 text-glow">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Redes */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href="https://www.tiktok.com/@claasix"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-social group"
          >
            <TikTokIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">TikTok</span>
            <span className="text-muted-foreground">@claasix</span>
          </a>

          {/* Discord: texto estático, sin enlace */}
          <div className="btn-social cursor-default select-text" aria-label="Discord: @cl6zy">
            <DiscordIcon className="h-5 w-5 text-[#8b93a7]" />
            <span className="font-medium">Discord</span>
            <span className="text-muted-foreground">@cl6zy</span>
          </div>
        </div>
      </main>
    </div>
  );
}
