import { ProcessedMovie, Movie } from "../../domain/movie";

export interface MovieApiService {
    triggerML(movieData: Movie): Promise<ProcessedMovie[]>;
}
