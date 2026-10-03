import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Sparkles, Gamepad2, Clapperboard, Users } from "lucide-react";
import { getRobloxAvatar } from "@/lib/roblox.functions";
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

/* ============================================================
   ⭐ EDITA AQUÍ — Valores de respaldo de seguidores (sin comas)
   ============================================================ */
const FOLLOWER_FALLBACKS: Record<string, number> = {
  claasix: 12500,
  mazzi1nky: 0,
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
};

const CREATORS: CreatorProfile[] = [
  {
    id: "classix",
    displayName: "classix",
    robloxUserId: "5321645648",
    robloxUsername: "cl6zy",
    bio: "Desarrollador de experiencias en Roblox, programador en Luau y creador de contenido.",
    tiktokUsername: "claasix",
    discordHandle: "@cl6zy",
    role: "Creador de Contenido",
  },
  {
    id: "mazzi",
    displayName: "Mazzi",
    robloxUserId: "4999897326",
    robloxUsername: "maxplis123",
    bio: "Creador de contenido de Roblox, creciendo cada dia mas",
    tiktokUsername: "mazzi1nky",
    discordHandle: "@mazzi1nky",
    role: "Creador de Contenido",
  },
];
