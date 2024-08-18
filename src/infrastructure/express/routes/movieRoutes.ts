import express from "express";
import { MovieController } from "../../../application/controllers/movieController";
import { MovieApiServiceImp } from "../../../application/external-services/mlApiService";
import { TMDBApiExternalService } from "../../../application/external-services/tmdbService";
import { MovieServiceImpl } from "../../../application/usecases/movieServiceMLImp";
import { MovieByTitleServiceImpl } from "../../../application/usecases/movieByTitleServiceImp";
import { MongoCacheAdapter } from "../../../adapters/mongoCacheAdapter";
import { MoviePredicted } from "../../../interfaces/dtos/mlApi-dto";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const movieApiService = new MovieApiServiceImp();
        const mongoCache = new MongoCacheAdapter<MoviePredicted[]>();
        const movieMLService = new MovieServiceImpl(movieApiService, mongoCache);
        const externalTMDBAPIService = new TMDBApiExternalService();
        const tmdbAPIService = new MovieByTitleServiceImpl(externalTMDBAPIService);
        const movieController = new MovieController(movieMLService, tmdbAPIService);

        await movieController.recommendMovies(req, res);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message });
    }
});

export default router;
