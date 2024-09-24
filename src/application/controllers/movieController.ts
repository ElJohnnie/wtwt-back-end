import { Request, Response } from "express";
import { MovieServiceInterface } from "../../interfaces/movieServiceMLInterface";
import { MovieByTitleServiceInterface } from "../../interfaces/movieByTitleServiceinterface";
import { MovieSchema, Movie } from "../../domain/entities/movie";
import { sanitizeTitle } from "../../utils/sanitizeTitle";
import { TmdbResultDTO } from "../../interfaces/dtos/tmdb-dto";
import { MoviePredicted } from "../../interfaces/mlApiServiceInterface";
import { TmdbResponse } from "../../interfaces/tmdbServiceInterface";
// import { randomizeChoice } from "../../utils/randomizeChoise";

export class MovieController {
    constructor(
        private _movieService: MovieServiceInterface<MoviePredicted[]>,
        private _movieByTitleService: MovieByTitleServiceInterface<TmdbResponse>
    ) {}

    async recommendMovies(req: Request, res: Response) {
        try {

            const parsedData = MovieSchema.safeParse(req.query);
            if (!parsedData.success) {
                return res.status(400).json({ error: "Dados inválidos", details: parsedData.error.errors });
            }

            const data = req.query as unknown as Movie;
            const recommendedMovies = await this._movieService.getRecommendedMovies(data);
            if (recommendedMovies.length === 0) {
                return res.status(404).json({ error: "Nenhum filme recomendado encontrado" });
            }

            // const firstRecommendedMovie = randomizeChoice(recommendedMovies);
            const firstRecommendedMovie = recommendedMovies[0];
            const movie = sanitizeTitle(firstRecommendedMovie.title);
            const detailedFirstMovie = await this._movieByTitleService.getMoviesByTitle({
                query: movie,
                language: 'pt-br'
            });

            const result: TmdbResultDTO = {
                backdrop_path: detailedFirstMovie.results[0].backdrop_path,
                popularity: detailedFirstMovie.results[0].vote_average,
                title: detailedFirstMovie.results[0].title,
                overview: detailedFirstMovie.results[0].overview
            };

            res.json(result);
        } catch (error) {
            const status = error.response ? error.response.status : 500;
            const errorResponse = {
                status: status,
                error: error.response ? error.response.statusText : 'Internal Server Error',
                message: error.message
            };
            res.status(status).json(errorResponse);
        }
    }
}
