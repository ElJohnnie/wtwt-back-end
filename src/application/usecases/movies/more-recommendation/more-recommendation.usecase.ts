import { TMDBExternalService } from "../../../external-services/the-movie-database/the-movie-database.external-service";
import { OutputMoreRecommendationDTO } from "./more-recommendation.dto";
import { InputMoreRecommendationDTO } from "./more-recommendation.dto";

export class MoreMoviesRecommendationUseCase {
    constructor(private readonly tmdbApiService: TMDBExternalService) {}

    async execute(params: InputMoreRecommendationDTO): Promise<OutputMoreRecommendationDTO['results']> {
        let allResults: OutputMoreRecommendationDTO['results'] = [];

        for (const title of params.query) {
            const response: OutputMoreRecommendationDTO = await this.tmdbApiService.command({
                query: title,
            });
            allResults = allResults.concat(response.results);
        }
        return allResults;
    }
}
