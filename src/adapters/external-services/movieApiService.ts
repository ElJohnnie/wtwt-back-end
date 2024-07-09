import { Movie } from "../../domain/entities/movie";
import { MoviePredicted } from "./dtos/mlApi-dto";

export interface MovieApiService {
    triggerML(movieData: Movie): Promise<MoviePredicted[]>;
}
