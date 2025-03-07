import { MainRequestDTO } from "../../interfaces/dtos/mainRequestDTO";
import { MLApiService } from "../../interfaces/external-services/mlApiServiceInterface";
import { MoviePredicted } from '../../interfaces/dtos/mlServiceDTO';
import { UseCasesInterface } from "../../interfaces/usecases/useCasesInterface";

export class GetRecommendedMoviesUseCase implements UseCasesInterface<MoviePredicted[]> {
    constructor(
        private readonly movieApiService: MLApiService<MoviePredicted[]>
    ) {}

    async execute(movieData: MainRequestDTO) {
        const recommendedMovies = await this.movieApiService.triggerML(movieData);
        const processedMovies: MoviePredicted[] = this.processRecommendedMovies(recommendedMovies);
        return processedMovies;
    }

    private processRecommendedMovies(recommendedMovies) {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }
}
