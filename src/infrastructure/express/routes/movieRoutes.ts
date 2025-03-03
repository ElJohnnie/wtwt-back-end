import express from "express";
import { MovieController } from "../../../application/controllers/movieController";
import { MLApiServiceImp } from "../../../application/external-services/mlApiServiceImp";
import { TMDBApiExternalService } from "../../../application/external-services/tmdbServiceImp";
import { GetRecommendedMoviesUseCase } from "../../../application/usecases/getRecommendedMoviesUseCase";
import { GetMoviesByTitleUseCase } from "../../../application/usecases/getMoviesByTitleUseCase";
import { MoreRecommendationsController } from '../../../application/controllers/moreMoviesRecomendationController';
import { MoreMoviesRecommendationUseCase } from "../../../application/usecases/moreMovieRecommendationUseCase";


const router = express.Router();

router.get("/", (req, res) => {
    const movieApiService = new MLApiServiceImp();
    const recommendedMovie = new GetRecommendedMoviesUseCase(movieApiService);
    const externalTMDBAPIService = new TMDBApiExternalService();
    const getMoviesByTitle = new GetMoviesByTitleUseCase(externalTMDBAPIService);
    const movieController = new MovieController(recommendedMovie, getMoviesByTitle);

    movieController.recommendMovies(req, res);
});

router.get("/more-recommendations", (req, res) => {
    const externalTMDBAPIService = new TMDBApiExternalService();
    const moreMoviesRecommendation = new MoreMoviesRecommendationUseCase(externalTMDBAPIService);
    const moreRecommendationsController = new MoreRecommendationsController(moreMoviesRecommendation);

    moreRecommendationsController.recommendMovies(req, res);
});

export default router;
