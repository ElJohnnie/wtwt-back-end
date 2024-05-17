import { Request, Response } from "express";
import { MovieService } from "../../usecases/movieService";
import { MovieSchema, Movie } from "../../domain/movie";

export class MovieController {
    constructor(private movieService: MovieService) {}

    async recommendMovies(req: Request, res: Response): Promise<any> {
        try {
            const parsedData = MovieSchema.safeParse(req.query);

            if (!parsedData.success) {
                return res.status(400).json({ error: "Dados inválidos", details: parsedData.error.errors });
            }

            const data = req.query as unknown as Movie;
            const recommendedMovies = await this.movieService.getRecommendedMovies(data);
            res.json(recommendedMovies);
        } catch (error) {
            console.error("Erro ao processar requisição:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
