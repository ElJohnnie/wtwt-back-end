import { Movie } from "../../domain/entities/movie";
import { MovieService } from "../../interfaces/movieServiceML";
import { MovieApiService } from "../../interfaces/mlApiServiceInterface";
import { CacheAdapter } from "../../interfaces/cacheAdapter";
import { MoviePredicted } from "../../interfaces/dtos/mlApi-dto";

export class MovieServiceImpl implements MovieService {

    constructor(
        private movieApiService: MovieApiService,
        private cacheAdapter: CacheAdapter<MoviePredicted[]>
    ) { }

    async getRecommendedMovies(movieData: Movie): Promise<MoviePredicted[]> {
        let recommendedMovies;
        let cacheKey;

        if(process.env.MONGO_URL) {
            cacheKey = this.createCacheKey(movieData);
            recommendedMovies = await this.cacheAdapter.get(cacheKey);
            if (recommendedMovies) {
                return recommendedMovies;
            }
        }

        recommendedMovies = await this.movieApiService.triggerML(movieData);
        const processedMovies = this.processRecommendedMovies(recommendedMovies);

        if(process.env.MONGO_URL) await this.cacheAdapter.set(cacheKey, processedMovies);

        return processedMovies;
    }

    private processRecommendedMovies(recommendedMovies: MoviePredicted[]): MoviePredicted[] {
        return recommendedMovies.map(movie => ({
            title: movie.title,
            genres: movie.genres
        }));
    }

    private createCacheKey(movieData: Movie): string {
        return JSON.stringify(movieData);
    }
}
