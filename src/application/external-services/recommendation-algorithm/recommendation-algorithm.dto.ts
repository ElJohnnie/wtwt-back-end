export interface PredictionResponse {
    message: string;
    data: MoviePredicted[];
}

export interface MoviePredicted {
    title: string;
    genres: string[];
}

export interface InputRecommendationAlgorithm {
    mood?: string;
    primaryGenre?: string;
    secondaryGenre?: string;
    epoch?: string;
}

export interface OutputRecommendationAlgorithm {
    title: string;
    genres: string[];
}
