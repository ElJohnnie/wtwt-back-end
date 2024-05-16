import { ProcessedMovie, Movie } from "../../domain/movie";
import { MovieApiService } from "./movieApiService";

export class MovieApiServiceMock implements MovieApiService {
    async triggerML(movieData: Movie): Promise<ProcessedMovie[]> {
        const mockedMovies: ProcessedMovie[] = [
            { title: "Movie 1", },
        ];
        return mockedMovies;
    }
}
