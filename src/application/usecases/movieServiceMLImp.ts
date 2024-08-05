import { Movie } from "../../domain/entities/movie";
import { MovieService } from "../../interfaces/movieServiceML";
import { MovieApiService } from "../../interfaces/mlApiServiceInterface";

export class MovieServiceImpl implements MovieService {
    constructor(
        private movieApiService: MovieApiService
    ) {}

    async getRecommendedMovies(movieData: Movie) {
        const recommendedMovies = await this.movieApiService.triggerML(movieData);
        const processedMovies = this.processRecommendedMovies(recommendedMovies);
        return processedMovies;
    }

    private processRecommendedMovies(recommendedMovies) {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }
}
