import { Movie } from "../domain/movie";
import { ProcessedMovie } from "../domain/movie";

export interface MovieService {
    getRecommendedMovies(movieData: Movie): Promise<ProcessedMovie[]>;
}
