import { IExternalServices } from '../../../../@shared/external-services/external-services.interface';
import { OutputRecommendationAlgorithm } from '../../../external-services/recommendation-algorithm/recommendation-algorithm.dto';
import { OutputTMDB } from "../../../external-services/the-movie-database/the-movie-database.dto";
import { sanitizeTitle } from "../../../../utils/sanitize-title.util";
import { InputGetRecommendedMoviesDTO, OutputGetRecommendedMoviesDTO } from "./get-recommended.movies.dto";

export class GetRecommendedMoviesUseCase {
    constructor(
        private readonly mlApiServiceImp: IExternalServices<OutputRecommendationAlgorithm[]>,
        private readonly tmdbServiceImp: IExternalServices<OutputTMDB>
    ) {}

    async execute(movieData: InputGetRecommendedMoviesDTO): Promise<OutputGetRecommendedMoviesDTO> {
        const recommendedMovies = await this.mlApiServiceImp.command(movieData);

        const processedMovies: OutputRecommendationAlgorithm[] = this.processRecommendedMovies(recommendedMovies);

        const firstRecommendedMovie = processedMovies[0];

        const movie = sanitizeTitle(firstRecommendedMovie.title);

        const detailedFirstMovie = await this.tmdbServiceImp.command({
            query: movie,
            language: 'pt-br'
        });

        const resultDTO: OutputGetRecommendedMoviesDTO = {
            id: detailedFirstMovie.results[0].id,
            backdrop_path: detailedFirstMovie.results[0].backdrop_path,
            popularity: detailedFirstMovie.results[0].vote_average,
            title: detailedFirstMovie.results[0].title,
            overview: detailedFirstMovie.results[0].overview,
            otherMovies: recommendedMovies.slice(1, 10).map(movie => movie.title)
        };

        return resultDTO;
    }

    private processRecommendedMovies(recommendedMovies) {
        return recommendedMovies.map(movie => ({
            title: movie.title,
        }));
    }
}
