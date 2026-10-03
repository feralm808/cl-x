import { createServerFn } from "@tanstack/react-start";

const ROBLOX_USER_ID = "5321645648";

export const getRobloxAvatar = createServerFn({ method: "GET" }).handler(
  async () => {
    const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ROBLOX_USER_ID}&size=352x352&format=Png&isCircular=true`;
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
          if (item?.state === "Completed" && item.imageUrl) return { imageUrl: item.imageUrl };
        }
      } catch {
        /* reintenta */
      }
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
    return { imageUrl: null as string | null };
  },
);
