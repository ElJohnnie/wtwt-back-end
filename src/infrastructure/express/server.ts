import express from 'express';
import cors from 'cors';
import movieRoutes from "./routes/movieRoutes";
import dotenv from 'dotenv';
import corsConfig from './config/corsConfig';

dotenv.config();
const app = express();

app.use(cors(corsConfig));

app.use("/movies", movieRoutes);

export default app;

