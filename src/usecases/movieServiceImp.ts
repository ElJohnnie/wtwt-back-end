import { Movie } from "../domain/movie";
import { ProcessedMovie } from "../domain/movie";
import { MovieService } from "./movieService";
import { MovieApiService } from "../adapters/external-services/movieApiService";

export class MovieServiceImpl implements MovieService {
    constructor(
        private movieApiService: MovieApiService
    ) {}

    async getRecommendedMovies(movieData: Movie): Promise<ProcessedMovie[]> {
        const recommendedMovies = await this.movieApiService.triggerML(movieData);
        const processedMovies = this.processRecommendedMovies(recommendedMovies);
        return processedMovies;
    }

    private processRecommendedMovies(recommendedMovies: ProcessedMovie[]): ProcessedMovie[] {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }
}
