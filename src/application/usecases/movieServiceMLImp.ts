import { Movie } from "../../domain/entities/movie";
import { MovieServiceInterface } from "../../interfaces/movieServiceMLInterface";
import { MovieApiService } from "../../interfaces/mlApiServiceInterface";
import { MoviePredicted } from "../../interfaces/mlApiServiceInterface";

export class MovieServiceImpl implements MovieServiceInterface<MoviePredicted[]> {
    constructor(
        private movieApiService: MovieApiService<MoviePredicted[]>
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
