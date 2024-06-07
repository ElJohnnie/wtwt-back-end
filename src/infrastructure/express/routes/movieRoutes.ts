import express from "express";
import { MovieController } from "../../../adapters/controllers/movieController";
import { MovieApiServiceImp } from "../../../adapters/external-services/mlApiService";
import { TMDBApiExternalService } from "../../../adapters/external-services/tmdbService";
import { MovieServiceImpl } from "../../../usecases/movieServiceMLImp";
import { MovieByTitleServiceImpl } from "../../../usecases/movieByTitleServiceImp";

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
