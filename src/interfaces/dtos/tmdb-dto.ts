
export interface TmdbResultDTO {
    backdrop_path: string;
    popularity: number;
    title: string;
    overview: string;
    otherMovies: {
        title: string;
        popularity: number;
        backdrop_path: string;
        overview: string;
    }[]
}



