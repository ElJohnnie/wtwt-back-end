import { Movie } from "../domain/entities/movie";
import { ProcessedMovie } from "../domain/entities/processedMovie";
import { MovieService } from "./movieServiceML";
import { MovieApiService } from "../adapters/external-services/movieApiService";

export class MovieServiceImpl implements MovieService {
    constructor(
        private movieApiService: MovieApiService
    ) {}

    async getRecommendedMovies(movieData: Movie): Promise<ProcessedMovie[]> {
        console.log(movieData);
        const recommendedMovies = await this.movieApiService.triggerML(movieData);
        console.log(recommendedMovies);
        const processedMovies = this.processRecommendedMovies(recommendedMovies);
        return processedMovies;
    }

    private processRecommendedMovies(recommendedMovies: ProcessedMovie[]): ProcessedMovie[] {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }
}
