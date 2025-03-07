import express from "express";
import { MovieController } from "../../../application/controllers/movieController";
import { MLApiServiceImp } from "../../../application/external-services/mlApiServiceImp";
import { TMDBApiExternalService } from "../../../application/external-services/tmdbServiceImp";
import { GetRecommendedMoviesUseCase } from "../../../application/usecases/getRecommendedMoviesUseCase";
import { GetMoviesByTitleUseCase } from "../../../application/usecases/getMoviesByTitleUseCase";
import { MoreRecommendationsController } from '../../../application/controllers/moreMoviesRecomendationController';
import { MoreMoviesRecommendationUseCase } from "../../../application/usecases/moreMovieRecommendationUseCase";

const router = express.Router();

const movieApiService = new MLApiServiceImp();
const recommendedMovie = new GetRecommendedMoviesUseCase(movieApiService);
const externalTMDBAPIService = new TMDBApiExternalService();
const getMoviesByTitle = new GetMoviesByTitleUseCase(externalTMDBAPIService);
const moreMoviesRecommendation = new MoreMoviesRecommendationUseCase(externalTMDBAPIService);

router.get("/", (req, res) => {
    new MovieController(recommendedMovie, getMoviesByTitle).command(req, res);
});

router.get("/more-recommendations", (req, res) => {
    new MoreRecommendationsController(moreMoviesRecommendation).command(req, res);
});

export default router;
