import express from "express";
import { MovieController } from "../../../application/controllers/movieController";
import { MLApiServiceImp } from "../../../application/external-services/mlApiServiceImp";
import { TMDBApiExternalService } from "../../../application/external-services/tmdbServiceImp";
import { MLUsecaseImpl } from "../../../application/usecases/mlUsecaseImp";
import { MovieByTitleServiceImpl } from "../../../application/usecases/movieByTitleServiceImp";
import { MoreRecommendationsController } from '../../../application/controllers/moreMoviesRecomendationController';
import { MoreMoviesRecommendationImpl } from "../../../application/usecases/moreMovieRecommendationImp";


const router = express.Router();

router.get("/", (req, res) => {
    const movieApiService = new MLApiServiceImp();
    const movieMLService = new MLUsecaseImpl(movieApiService);
    const externalTMDBAPIService = new TMDBApiExternalService();
    const tmdbAPIService = new MovieByTitleServiceImpl(externalTMDBAPIService);
    const movieController = new MovieController(movieMLService, tmdbAPIService);

    movieController.recommendMovies(req, res);
});

router.get("/more-recommendations", (req, res) => {
    const externalTMDBAPIService = new TMDBApiExternalService();
    const moreMoviesRecommendation = new MoreMoviesRecommendationImpl(externalTMDBAPIService);
    const moreRecommendationsController = new MoreRecommendationsController(moreMoviesRecommendation);

    moreRecommendationsController.recommendMovies(req, res);
});

export default router;
