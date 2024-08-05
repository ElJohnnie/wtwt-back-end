import express from "express";
import { MovieController } from "../../../application/controllers/movieController";
import { MovieApiServiceImp } from "../../../application/external-services/mlApiService";
import { TMDBApiExternalService } from "../../../application/external-services/tmdbService";
import { MovieServiceImpl } from "../../../application/usecases/movieServiceMLImp";
import { MovieByTitleServiceImpl } from "../../../application/usecases/movieByTitleServiceImp";

const router = express.Router();

router.get("/", (req, res) => {
    const movieApiService = new MovieApiServiceImp();
    const movieMLService = new MovieServiceImpl(movieApiService);
    const externalTMDBAPIService = new TMDBApiExternalService();
    const tmdbAPIService = new MovieByTitleServiceImpl(externalTMDBAPIService);
    const movieController = new MovieController(movieMLService, tmdbAPIService);

    movieController.recommendMovies(req, res);
});

export default router;
