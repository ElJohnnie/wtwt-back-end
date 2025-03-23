import { Request, Response } from "express";
import { IUseCases } from "../../../@shared/usecases/usecases.interface";
import { OutputMoreRecommendationDTO } from "../../usecases/movies/more-recommendation/more-recommendation.dto";

export class MoreRecommendationsController {
    constructor(
        private readonly _moreMoviesRecommendation: IUseCases<OutputMoreRecommendationDTO['results']>
    ) {}

    async command(req: Request, res: Response) {
        try {
            const query = req.query.movies as string;

            const moreResultsMovies = await this._moreMoviesRecommendation.execute({
                query: query.split(','),
                language: 'pt-br'
            });

            res.json(moreResultsMovies);
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
