import { TMDBExternalService } from "../../../external-services/the-movie-database/the-movie-database.external-service";
import { OutputMoreRecommendationDTO } from "./more-recommendation.dto";
import { InputMoreRecommendationDTO } from "./more-recommendation.dto";

export class MoreMoviesRecommendationUseCase {
    constructor(private readonly tmdbApiService: TMDBExternalService) {}

    async execute(params: InputMoreRecommendationDTO): Promise<OutputMoreRecommendationDTO['results']> {
        let allResults: OutputMoreRecommendationDTO['results'] = [];

        const limitedQuery = params.query.slice(0, 12);

        for (const title of limitedQuery) {
            const response: OutputMoreRecommendationDTO = await this.tmdbApiService.command({
                query: title,
                include_adult: params.include_adult,
                language: params.language,
            });
            allResults = allResults.concat(response.results);
        }

        return allResults.slice(0, 12);
    }
}
