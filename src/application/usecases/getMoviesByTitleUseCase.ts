import { TmdbResponse } from "../../interfaces/dtos/TmdbResponseDTO";
import { TMDBApiExternalService } from "../external-services/tmdbServiceImp";
import { IUseCases } from "../../interfaces/usecases/IuseCases";

export class GetMoviesByTitleUseCase implements IUseCases<TmdbResponse> {
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
        return this.tmdbApiService.command(params);
    }
}
