import express from 'express';
import cors from 'cors';
import movieRoutes from "./routes/movieRoutes";
import corsConfig from './config/corsConfig';
import checkAuthorizationCode from './middlwares/checkAuthorizationCode';

const app = express();

app.use(cors(corsConfig));

app.use(checkAuthorizationCode);

app.use("/movies", movieRoutes);

export default app;

