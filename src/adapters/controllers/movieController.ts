import { Request, Response } from "express";
import { MovieService } from "../../usecases/movieServiceML";
import { MovieByTitleService } from "../../usecases/movieByTitleService";
import { MovieSchema, Movie } from "../../domain/movie";
import { sanitizeTitle } from "../../utils/sanitizeTitle";

export class MovieController {
    constructor(
        private movieService: MovieService,
        private movieByTitleService: MovieByTitleService
    ) {}

    async recommendMovies(req: Request, res: Response): Promise<any> {
        try {

            const parsedData = MovieSchema.safeParse(req.query);
            if (!parsedData.success) {
                return res.status(400).json({ error: "Dados inválidos", details: parsedData.error.errors });
            }

            const data = req.query as unknown as Movie;
            const recommendedMovies = await this.movieService.getRecommendedMovies(data);
            if (recommendedMovies.length === 0) {
                return res.status(404).json({ error: "Nenhum filme recomendado encontrado" });
            }

            // trocar para um algoritmo de aleatoriedade
            const firstRecommendedMovie = recommendedMovies[0];
            const movie = sanitizeTitle(firstRecommendedMovie.title);
            const detailedFirstMovie = await this.movieByTitleService.getMoviesByTitle({
                query: movie,
            });
            res.json({ recommendedMovie: firstRecommendedMovie, detailedMovie: detailedFirstMovie });
        } catch (error) {
            res.status(error.response.status).json(
                {
                    status:error.response.status,
                    error: error.response.statusText,
                    message: error.message
                }
            );
        }
    }
}
