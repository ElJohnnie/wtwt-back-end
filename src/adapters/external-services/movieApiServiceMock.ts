import { ProcessedMovie, Movie } from "../../domain/movie";
import { MovieApiService } from "./movieApiService";

export class MovieApiServiceMock implements MovieApiService {
    async triggerML(_movieData: Movie): Promise<ProcessedMovie[]> {
        const mockedMovies: ProcessedMovie[] = [
            { title: "Clube da Luta", },
        ];
        return mockedMovies;
    }
}
