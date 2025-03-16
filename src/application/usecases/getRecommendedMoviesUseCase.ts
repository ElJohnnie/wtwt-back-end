import { MainRequestDTO } from "../../interfaces/dtos/mainRequestDTO";
import { IExternalServices } from "../../interfaces/external-services/IExternalServices";
import { MoviePredicted } from '../../interfaces/dtos/mlServiceDTO';
import { IUseCases } from "../../interfaces/usecases/IuseCases";

export class GetRecommendedMoviesUseCase implements IUseCases<MoviePredicted[]> {
    constructor(
        private readonly movieApiService: IExternalServices<MoviePredicted[]>
    ) {}

    async execute(movieData: MainRequestDTO) {
        const recommendedMovies = await this.movieApiService.command(movieData);
        const processedMovies: MoviePredicted[] = this.processRecommendedMovies(recommendedMovies);
        return processedMovies;
    }

    private processRecommendedMovies(recommendedMovies) {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }
}
