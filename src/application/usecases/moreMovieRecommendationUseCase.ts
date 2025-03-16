import { TMDBApiExternalService } from "../external-services/tmdbServiceImp";
import { TmdbResponse } from "../../interfaces/dtos/TmdbResponseDTO";
import { IUseCases } from "../../interfaces/usecases/IuseCases";

export class MoreMoviesRecommendationUseCase implements IUseCases<TmdbResponse> {
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
            const response: TmdbResponse = await this.tmdbApiService.command({
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
