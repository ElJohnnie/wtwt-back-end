import { Request, Response } from "express";
import { GetRecommendedMoviesInterface } from "../../interfaces/getRecommendedMoviesInterface";
import { MovieByTitleServiceInterface } from "../../interfaces/getMoviesByTitleInterface";
import { MainRequestSchema, MainRequestDTO } from "../../interfaces/dtos/mainRequestDTO";
import { sanitizeTitle } from "../../utils/sanitizeTitle";
import { TmdbResultDTO } from "../../interfaces/dtos/tmdbDTO";
import { MoviePredicted } from '../../interfaces/dtos/mlServiceDTO';
import { TmdbResponse } from "../../interfaces/tmdbServiceInterface";

export class MovieController {
    constructor(
        private readonly _getRecommendedMovies: GetRecommendedMoviesInterface<MoviePredicted[]>,
        private readonly _getMovieByTitle: MovieByTitleServiceInterface<TmdbResponse>
    ) {}

    async recommendMovies(req: Request, res: Response) {
        try {

            const parsedData = MainRequestSchema.safeParse(req.query);
            if (!parsedData.success) {
                return res.status(400).json({ error: "Dados inválidos", details: parsedData.error.errors });
            }

            const data = req.query as unknown as MainRequestDTO;
            const recommendedMovies = await this._getRecommendedMovies.execute(data);
            if (recommendedMovies.length === 0) {
                return res.status(404).json({ error: "Nenhum filme recomendado encontrado" });
            }

            const firstRecommendedMovie = recommendedMovies[0];

            const movie = sanitizeTitle(firstRecommendedMovie.title);
            const detailedFirstMovie = await this._getMovieByTitle.execute({
                query: movie,
                language: 'pt-br'
            });

            const result: TmdbResultDTO = {
                backdrop_path: detailedFirstMovie.results[0].backdrop_path,
                popularity: detailedFirstMovie.results[0].vote_average,
                title: detailedFirstMovie.results[0].title,
                overview: detailedFirstMovie.results[0].overview,
                otherMovies: recommendedMovies.slice(1, 10).map(movie => movie.title)
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
