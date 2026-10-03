import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getTikTokFollowers = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ username: z.string().regex(/^[A-Za-z0-9._]{1,30}$/) }).parse(data),
  )
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`https://www.tiktok.com/@${data.username}`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
          "Accept-Language": "es-ES,es;q=0.9",
        },
      });
      if (!res.ok) return { followers: null as number | null };
      const html = await res.text();
      const m = html.match(/"followerCount":(\d+)/);
      return { followers: m ? Number(m[1]) : null };
    } catch {
      return { followers: null as number | null };
    }
  });
