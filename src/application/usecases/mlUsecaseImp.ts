import { Movie } from "../../domain/entities/movie";
import { MLUsecaseInterface } from "../../interfaces/mlUsecaseInterface";
import { MLApiService } from "../../interfaces/mlApiServiceInterface";
import { MoviePredicted } from '../../interfaces/dtos/mlServiceDTO';

export class MLUsecaseImpl implements MLUsecaseInterface<MoviePredicted[]> {
    constructor(
        private readonly movieApiService: MLApiService<MoviePredicted[]>
    ) {}

    async getRecommendedMovies(movieData: Movie) {
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
