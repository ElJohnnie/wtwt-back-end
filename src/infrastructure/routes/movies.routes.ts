import express from "express";
import { MovieController } from "../../application/controllers/movies/get-recommended.movies.controller";
import { RecommendationAlgorithm } from "../../application/external-services/recommendation-algorithm/recommendation-algorithm.external-service";
import { TMDBExternalService } from "../../application/external-services/the-movie-database/the-movie-database.external-service";
import { GetRecommendedMoviesUseCase } from "../../application/usecases/movies/get-recommended/get-recommended.movies.usecase";
import { MoreRecommendationsController } from '../../application/controllers/movies/more-recommendation.controller';
import { MoreMoviesRecommendationUseCase } from "../../application/usecases/movies/more-recommendation/more-recommendation.usecase";

const router = express.Router();

router.get("/", (req, res) => {
    const recommendedMovie = new GetRecommendedMoviesUseCase(new RecommendationAlgorithm(), new TMDBExternalService());
    new MovieController(recommendedMovie).command(req, res);
});

router.get("/more-recommendations", (req, res) => {
    const moreMoviesRecommendation = new MoreMoviesRecommendationUseCase(new TMDBExternalService());
    new MoreRecommendationsController(moreMoviesRecommendation).command(req, res);
});

export default router;
