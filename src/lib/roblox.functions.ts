import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getRobloxAvatar = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ userId: z.string().regex(/^\d+$/) }).parse(data),
  )
  .handler(async ({ data }) => {
    const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${data.userId}&size=352x352&format=Png&isCircular=true`;
    for (let i = 0; i < 3; i++) {
      try {
        const res = await fetch(url, {
          headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
        });
        if (res.ok) {
          const json = (await res.json()) as {
            data?: Array<{ imageUrl?: string; state?: string }>;
          };
          const item = json.data?.[0];
          if (item?.state === "Completed" && item.imageUrl)
            return { imageUrl: item.imageUrl };
        }
      } catch {
        /* reintenta */
      }
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
    return { imageUrl: null as string | null };
  });

export const getRobloxUser = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ userId: z.string().regex(/^\d+$/) }).parse(data),
  )
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`https://users.roblox.com/v1/users/${data.userId}`, {
        headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) return { displayName: null as string | null, username: null as string | null };
      const json = (await res.json()) as {
        displayName?: string;
        name?: string;
      };
      return {
        displayName: json.displayName ?? null,
        username: json.name ?? null,
      };
    } catch {
      return { displayName: null as string | null, username: null as string | null };
    }
  });

export const getRobloxFullBody = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ userId: z.string().regex(/^\d+$/) }).parse(data),
  )
  .handler(async ({ data }) => {
    const url = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.userId}&size=720x720&format=Png&isCircular=false`;
    for (let i = 0; i < 3; i++) {
      try {
        const res = await fetch(url, {
          headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
        });
        if (res.ok) {
          const json = (await res.json()) as {
            data?: Array<{ imageUrl?: string; state?: string }>;
          };
          const item = json.data?.[0];
          if (item?.state === "Completed" && item.imageUrl)
            return { imageUrl: item.imageUrl };
        }
      } catch {
        /* reintenta */
      }
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
    return { imageUrl: null as string | null };
  });
