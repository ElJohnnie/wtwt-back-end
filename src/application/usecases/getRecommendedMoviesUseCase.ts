import { MainRequestDTO } from "../../interfaces/dtos/mainRequestDTO";
import { GetRecommendedMoviesInterface } from "../../interfaces/getRecommendedMoviesInterface";
import { MLApiService } from "../../interfaces/mlApiServiceInterface";
import { MoviePredicted } from '../../interfaces/dtos/mlServiceDTO';

export class GetRecommendedMoviesUseCase implements GetRecommendedMoviesInterface<MoviePredicted[]> {
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
