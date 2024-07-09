import { Movie } from "../domain/entities/movie";
import { ProcessedMovie } from "../domain/entities/processedMovie";

export interface MovieService {
    getRecommendedMovies(movieData: Movie): Promise<ProcessedMovie[]>;
}
