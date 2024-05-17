import { TmdbResultDTO } from "../adapters/external-services/dtos/tmdb-dto";
import { TMDBApiExternalService } from "../adapters/external-services/tmdbService";
import { MovieByTitleService } from "./movieByTitleService";

export class MovieByTitleServiceImpl implements MovieByTitleService {
    constructor(private tmdbApiService: TMDBApiExternalService) {}

    async getMoviesByTitle(params: {
        query: string;
        include_adult: boolean;
        language: string;
        primary_release_year: string;
        page: number;
        region: string;
        year: string;
    }): Promise<TmdbResultDTO> {
        return this.tmdbApiService.getMoviesByTitle(params);
    }
}
