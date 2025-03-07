import { TMDBApiExternalService } from "../external-services/tmdbServiceImp";
import { TmdbResponse } from "../../interfaces/dtos/TmdbResponseDTO";
import { UseCasesInterface } from "../../interfaces/usecases/useCasesInterface";

export class MoreMoviesRecommendationUseCase implements UseCasesInterface<TmdbResponse> {
    constructor(private readonly tmdbApiService: TMDBApiExternalService) {}

    async execute(params: {
        query: string[];
        include_adult?: boolean;
        language?: string;
        primary_release_year?: string;
        page?: number;
        region?: string;
        year?: string;
    }): Promise<TmdbResponse> {
        let allResults: TmdbResponse['results'] = [];

        for (const title of params.query) {
            const response: TmdbResponse = await this.tmdbApiService.getMoviesByTitle({
                query: title,
            });
            allResults = allResults.concat(response.results);
        }
        return {
            page: 1,
            results: allResults,
            total_pages: 1,
            total_results: allResults.length
        };
    }
}
