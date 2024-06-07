export interface PredictionResponseDTO {
    message: string;
    data: MovieRecord[];
}

interface MovieRecord {
    title: string;
    genres: string[];
}
