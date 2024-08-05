import { Movie } from "../domain/entities/movie";
import { MoviePredicted } from "./dtos/mlApi-dto";

export interface MovieService {
    getRecommendedMovies(movieData: Movie): Promise<MoviePredicted[]>;
}
