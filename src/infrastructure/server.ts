import express from 'express';
import cors from 'cors';
import movieRoutes from "./routes/movies.routes";
import corsConfig from './config/cors.config';
import checkAuthorizationCode from './middlewares/check-authorization-code.middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors(corsConfig));

app.use(checkAuthorizationCode);

app.use("/movies", movieRoutes);

export default app;

