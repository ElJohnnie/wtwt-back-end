

import { z } from "zod";

export const MovieSchema = z.object({
    mood: z.string(),
    primaryGenre: z.string(),
    secondaryGenre: z.string(),
    epoch: z.string()
});
export type Movie = z.infer<typeof MovieSchema>;

export interface ProcessedMovie {
    title: string;
    genres?: string[];
}
