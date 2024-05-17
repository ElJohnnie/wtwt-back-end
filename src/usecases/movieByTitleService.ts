import { TmdbResultDTO } from "../adapters/external-services/dtos/tmdb-dto";

export interface MovieByTitleService {
    getMoviesByTitle(params: {
        query: string;
        include_adult: boolean;
        language: string;
        primary_release_year: string;
        page: number;
        region: string;
        year: string;
    }): Promise<TmdbResultDTO>;
}
