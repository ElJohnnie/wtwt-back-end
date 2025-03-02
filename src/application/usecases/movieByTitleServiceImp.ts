import { TmdbResponse } from "../../interfaces/tmdbServiceInterface";
import { TMDBApiExternalService } from "../external-services/tmdbServiceImp";
import { MovieByTitleServiceInterface } from "../../interfaces/movieByTitleServiceInterface";

export class MovieByTitleServiceImpl implements MovieByTitleServiceInterface<TmdbResponse> {
    constructor(private readonly tmdbApiService: TMDBApiExternalService) {}

    async getMoviesByTitle(params: {
        query: string;
        include_adult?: boolean;
        language?: string;
        primary_release_year?: string;
        page?: number;
        region?: string;
        year?: string;
    }): Promise<TmdbResponse> {
        return this.tmdbApiService.getMoviesByTitle(params);
    }
}
