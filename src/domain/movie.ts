

import { z } from "zod";

export const MovieSchema = z.object({
    mood: z.string(),
    primaryGenre: z.string(),
    secondaryGenre: z.string(),
    epoch: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
});
export type Movie = z.infer<typeof MovieSchema>;

export interface ProcessedMovie {
    title: string;
}
