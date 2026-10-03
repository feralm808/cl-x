import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const groupIdsSchema = z.object({
  groupIds: z.array(z.number().int().positive()).min(1).max(20),
});

type RobloxGroupResponse = {
  id: number;
  name: string;
  description: string;
  memberCount: number;
};

type RobloxThumbnailResponse = {
  data?: Array<{
    targetId: number;
    state?: string;
    imageUrl?: string;
  }>;
};

export const getRobloxGroups = createServerFn({ method: "GET" })
  .inputValidator((data) => groupIdsSchema.parse(data))
  .handler(async ({ data }) => {
    const groups = await Promise.all(
      data.groupIds.map(async (groupId) => {
        const [groupResponse, thumbnailResponse] = await Promise.all([
          fetch(`https://groups.roblox.com/v1/groups/${groupId}`, {
            headers: { Accept: "application/json" },
          }),
          fetch(
            `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`,
            { headers: { Accept: "application/json" } },
          ),
        ]);

        if (!groupResponse.ok) return null;

        const group = (await groupResponse.json()) as RobloxGroupResponse;
        const thumbnails = thumbnailResponse.ok
          ? ((await thumbnailResponse.json()) as RobloxThumbnailResponse)
          : null;
        const thumbnail = thumbnails?.data?.find(
          (item) => item.targetId === groupId && item.state === "Completed",
        );

        return {
          id: group.id,
          name: group.name,
          description: group.description,
          memberCount: group.memberCount,
          imageUrl: thumbnail?.imageUrl ?? null,
          robloxUrl: `https://www.roblox.com/communities/${group.id}`,
        };
      }),
    );

    return groups.filter((group) => group !== null);
  });