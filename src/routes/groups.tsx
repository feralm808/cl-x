import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ImageIcon, Users } from "lucide-react";
import { getRobloxGroups } from "@/lib/roblox-groups.functions";

const GROUP_IDS = [70474731, 606502980, 35971654];
const GROUP_REFRESH_INTERVAL = 15 * 60 * 1000;

const groupsQueryOptions = () =>
  queryOptions({
    queryKey: ["roblox-groups", ...GROUP_IDS],
    queryFn: () => getRobloxGroups({ data: { groupIds: GROUP_IDS } }),
    staleTime: GROUP_REFRESH_INTERVAL,
    refetchInterval: GROUP_REFRESH_INTERVAL,
    retry: 3,
  });

export const Route = createFileRoute("/groups")({
  head: () => ({
    meta: [
      { title: "Grupos de Roblox · CL-X" },
      {
        name: "description",
        content: "Conoce los grupos oficiales de nuestra comunidad de creadores de Roblox.",
      },
      { property: "og:title", content: "Grupos de Roblox · CL-X" },
      {
        property: "og:description",
        content: "Grupos oficiales de la comunidad CL-X en Roblox.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  // Prefetch sin bloquear la navegación (evita que se vea la página anterior)
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(groupsQueryOptions());
  },
  component: GroupsPage,
});

function GroupsPage() {
  const { data: groups, isError } = useQuery(groupsQueryOptions());
  const visibleGroups = groups ?? [];

  return (
    <main className="page-shell">
      <header className="max-w-2xl">
        <p className="section-kicker">Nuestra comunidad</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
          Grupos oficiales
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Explora nuestros espacios en Roblox y únete directamente desde su página oficial.
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Grupos de Roblox">
        {visibleGroups.map((group) => (
          <a
            key={group.id}
            href={group.robloxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-lg border border-edge bg-surface/70 transition duration-300 hover:-translate-y-1 hover:border-glow/50 hover:shadow-glow-sm"
          >
            <div className="aspect-square overflow-hidden bg-card">
              {group.imageUrl ? (
                <img
                  src={group.imageUrl}
                  alt={`Imagen del grupo ${group.name}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">{group.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">ID {group.id}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-glow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-edge pt-4 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-cyan-glow" />
                <strong className="font-display text-base text-foreground">
                  {group.memberCount.toLocaleString("es-ES")}
                </strong>
                miembros
              </div>
            </div>
          </a>
        ))}
      </section>

      {isError ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Roblox no respondió esta vez. Volveremos a intentarlo automáticamente.
        </p>
      ) : null}
    </main>
  );
}
