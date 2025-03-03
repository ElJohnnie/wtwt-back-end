

import { z } from "zod";

export const MainRequestSchema = z.object({
    mood: z.string(),
    primaryGenre: z.string(),
    secondaryGenre: z.string(),
    epoch: z.string()
});

export type MainRequestDTO = z.infer<typeof MainRequestSchema>;


