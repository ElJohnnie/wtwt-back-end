import { TMDBExternalService } from "../../../external-services/the-movie-database/the-movie-database.external-service";
import { OutputMoreRecommendationDTO } from "./more-recommendation.dto";
import { InputMoreRecommendationDTO } from "./more-recommendation.dto";
import { IUseCases } from '../../../../@shared/usecases/usecases.interface';

export class MoreMoviesRecommendationUseCase implements IUseCases<OutputMoreRecommendationDTO['results']> {
    constructor(private readonly tmdbApiService: TMDBExternalService) {}

    async execute(params: InputMoreRecommendationDTO): Promise<OutputMoreRecommendationDTO['results']> {
        let allResults: OutputMoreRecommendationDTO['results'] = [];

        for (const title of params.query) {
            const response: OutputMoreRecommendationDTO = await this.tmdbApiService.command({
                query: title,
                language: params.language,
                include_adult: false,
            });
            allResults = allResults.concat(response.results[0]);
        }

        return allResults;
    }
}
