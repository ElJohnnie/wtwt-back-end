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
        const randomizeChoice = this.randomizeChoice(processedMovies);
        return [randomizeChoice];
    }

    private processRecommendedMovies(recommendedMovies) {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }

    private randomizeChoice(processedMovies) {
        if (processedMovies.length === 1) {
            return processedMovies[0]
        }
        return processedMovies[Math.floor(Math.random() * processedMovies.length)];
    }
}
