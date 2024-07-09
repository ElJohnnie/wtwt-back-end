import { Movie } from "../../domain/entities/movie";
import { ProcessedMovie } from "../../domain/entities/processedMovie";

export interface MovieApiService {
    triggerML(movieData: Movie): Promise<ProcessedMovie[]>;
}
