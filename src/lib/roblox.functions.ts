import { createServerFn } from "@tanstack/react-start";

const ROBLOX_USER_ID = "5321645648";

export const getRobloxAvatar = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const res = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ROBLOX_USER_ID}&size=352x352&format=Png&isCircular=true`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return { imageUrl: null };
      const json = (await res.json()) as {
        data?: Array<{ imageUrl?: string; state?: string }>;
      };
      const imageUrl = json.data?.[0]?.imageUrl ?? null;
      return { imageUrl };
    } catch {
      return { imageUrl: null };
    }
  },
);
