import { Request, Response } from "express";
import { MovieService } from "../../usecases/movieService";
import { Movie } from "../../domain/movie";

export class MovieController {
    constructor(private movieService: MovieService) {}

    async recommendMovies(req: Request, res: Response): Promise<void> {
        try {
            const movieData: Movie = req.body;
            const recommendedMovies = await this.movieService.getRecommendedMovies(movieData);
            res.json(recommendedMovies);
        } catch (error) {
            console.error("Erro ao processar requisição:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
