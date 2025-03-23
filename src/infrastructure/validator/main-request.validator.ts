import { z } from "zod";

export interface MainRequestDTO {
    mood?: string;
    primaryGenre?: string;
    secondaryGenre?: string;
    epoch?: string;
}

export const MainRequestSchema = z.object({
    mood: z.string().min(1, "Mood is required"),
    primaryGenre: z.string().min(1, "Primary genre is required"),
    secondaryGenre: z.string().min(1, "Secondary genre is required"),
    epoch: z.string().min(1, "Epoch is required"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateMainRequest = (data: unknown): { success: boolean; data?: MainRequestDTO; error?: any } => {
    const result = MainRequestSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.format() };
    }

    return {
        success: true,
        data: {
            mood: result.data.mood,
            primaryGenre: result.data.primaryGenre,
            secondaryGenre: result.data.secondaryGenre,
            epoch: result.data.epoch,
        },
    };
};
