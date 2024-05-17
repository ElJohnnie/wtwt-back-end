import express from "express";
import { MovieController } from "../../../adapters/controllers/movieController";
import { MovieApiServiceMock } from "../../../adapters/external-services/movieApiServiceMock";
import { MovieServiceImpl } from "../../../usecases/movieServiceMLImp";

const router = express.Router();
const movieApiService = new MovieApiServiceMock()
const movieService = new MovieServiceImpl(movieApiService);
const movieController = new MovieController(movieService);

router.get("/", movieController.recommendMovies.bind(movieController));

export default router;
