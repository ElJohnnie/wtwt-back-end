import { Request, Response } from "express";
import { IUseCases } from "../../../@shared/usecases/usecases.interface";
import { validateMainRequest } from "../../../infrastructure/validator/main-request.validator";
import { OutputGetRecommendedMoviesDTO } from "../../usecases/movies/get-recommended/get-recommended.movies.dto";

export class MovieController {
    constructor(
        private readonly _getRecommendedMovies: IUseCases<OutputGetRecommendedMoviesDTO>,
    ) {}

    async command(req: Request, res: Response) {
        try {

            const data = req.query;
            const validatedData = validateMainRequest(data);

            if (!validatedData.success) {
                return res.status(400).json({ error: "Dados inválidos", details: validatedData.error.errors });
            }

            const recommendedMovies = await this._getRecommendedMovies.execute(data);
            res.json(recommendedMovies);
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
