import { Request, Response } from "express";
import { MovieService } from "../../usecases/movieServiceML";
import { MovieByTitleService } from "../../usecases/movieByTitleService";
import { MovieSchema, Movie } from "../../domain/entities/movie";
import { sanitizeTitle } from "../../utils/sanitizeTitle";

export class MovieController {
    constructor(
        private _movieService: MovieService,
        private _movieByTitleService: MovieByTitleService
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

            const firstRecommendedMovie = recommendedMovies[0];
            const movie = sanitizeTitle(firstRecommendedMovie.title);
            const detailedFirstMovie = await this._movieByTitleService.getMoviesByTitle({
                query: movie,
                language: 'pt-br'
            });
            res.json({ recommendedMovie: firstRecommendedMovie, detailedMovie: detailedFirstMovie });
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
