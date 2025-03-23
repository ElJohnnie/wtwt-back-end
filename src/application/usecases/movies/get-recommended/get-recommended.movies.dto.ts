
export interface InputGetRecommendedMoviesDTO {
    mood: string;
    primaryGenre: string;
    secondaryGenre: string;
    epoch: string;
}

export interface OutputGetRecommendedMoviesDTO {
    id: number;
    backdrop_path?: string;
    popularity: number;
    title: string;
    overview: string;
    otherMovies: string[];
}
