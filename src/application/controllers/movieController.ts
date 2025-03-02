import { Request, Response } from "express";
import { MLUsecaseInterface } from "../../interfaces/mlUsecaseInterface";
import { MovieByTitleServiceInterface } from "../../interfaces/movieByTitleServiceInterface";
import { MovieSchema, Movie } from "../../domain/entities/movie";
import { sanitizeTitle } from "../../utils/sanitizeTitle";
import { TmdbResultDTO } from "../../interfaces/dtos/tmdbDTO";
import { MoviePredicted } from '../../interfaces/dtos/mlServiceDTO';
import { TmdbResponse } from "../../interfaces/tmdbServiceInterface";

export class MovieController {
    constructor(
        private readonly _mlService: MLUsecaseInterface<MoviePredicted[]>,
        private readonly _movieByTitleService: MovieByTitleServiceInterface<TmdbResponse>
    ) {}

    async recommendMovies(req: Request, res: Response) {
        try {

            const parsedData = MovieSchema.safeParse(req.query);
            if (!parsedData.success) {
                return res.status(400).json({ error: "Dados inválidos", details: parsedData.error.errors });
            }

            const data = req.query as unknown as Movie;
            const recommendedMovies = await this._mlService.getRecommendedMovies(data);
            if (recommendedMovies.length === 0) {
                return res.status(404).json({ error: "Nenhum filme recomendado encontrado" });
            }

            const firstRecommendedMovie = recommendedMovies[0];

            const movie = sanitizeTitle(firstRecommendedMovie.title);
            const detailedFirstMovie = await this._movieByTitleService.getMoviesByTitle({
                query: movie,
                language: 'pt-br'
            });

            const result: TmdbResultDTO = {
                backdrop_path: detailedFirstMovie.results[0].backdrop_path,
                popularity: detailedFirstMovie.results[0].popularity,
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
