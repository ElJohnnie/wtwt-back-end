import { TmdbResponse } from "../../interfaces/external-services/tmdbServiceInterface";
import { TMDBApiExternalService } from "../external-services/tmdbServiceImp";
import { UseCasesInterface } from "../../interfaces/usecases/useCasesInterface";

export class GetMoviesByTitleUseCase implements UseCasesInterface<TmdbResponse> {
    constructor(private readonly tmdbApiService: TMDBApiExternalService) {}

    async execute(params: {
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
