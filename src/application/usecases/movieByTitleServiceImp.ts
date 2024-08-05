import { TmdbResponseDTO } from "../../interfaces/dtos/tmdb-dto";
import { TMDBApiExternalService } from "../external-services/tmdbService";
import { MovieByTitleService } from "../../interfaces/movieByTitleService";

export class MovieByTitleServiceImpl implements MovieByTitleService {
    constructor(private tmdbApiService: TMDBApiExternalService) {}

    async getMoviesByTitle(params: {
        query: string;
        include_adult?: boolean;
        language?: string;
        primary_release_year?: string;
        page?: number;
        region?: string;
        year?: string;
    }): Promise<TmdbResponseDTO> {
        return this.tmdbApiService.getMoviesByTitle(params);
    }
}
