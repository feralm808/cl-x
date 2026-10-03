import { createFileRoute } from "@tanstack/react-router";
import { Gamepad2 } from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Juegos · CL-X" },
      {
        name: "description",
        content: "Juegos y experiencias de Roblox creados por la comunidad CL-X.",
      },
      { property: "og:title", content: "Juegos · CL-X" },
      {
        property: "og:description",
        content: "Próximamente: experiencias de Roblox creadas por nuestra comunidad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <main className="page-shell flex min-h-[70vh] flex-col justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-edge bg-surface text-glow">
        <Gamepad2 className="h-6 w-6" />
      </div>
      <p className="section-kicker mt-7">Experiencias Roblox</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold text-foreground sm:text-5xl">
        Nuestros juegos estarán aquí
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
        Este espacio está listo para presentar las próximas experiencias creadas por la comunidad.
      </p>
    </main>
  );
}