export interface PredictionResponse {
    message: string;
    data: MoviePredicted[];
}

export interface MoviePredicted {
    title: string;
    genres: string[];
}