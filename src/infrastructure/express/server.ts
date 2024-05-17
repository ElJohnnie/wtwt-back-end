import express from 'express';
import cors from 'cors';
import movieRoutes from "./routes/movieRoutes";

const app = express();

app.use(cors());

app.use("/movies", movieRoutes);

export default app;

