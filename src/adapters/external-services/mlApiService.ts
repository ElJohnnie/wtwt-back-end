import { Movie } from "../../domain/entities/movie";
import { MovieApiService } from "./movieApiService";
import { AxiosInstance } from 'axios';
import { PredictionResponseDTO, MoviePredicted } from "./dtos/mlApi-dto";
import { AxiosClient } from "../../infrastructure/axios/axiosClient";

export class MovieApiServiceImp implements MovieApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = AxiosClient.getInstance(process.env.ML_API_URL);
    }

    async triggerML(params: Movie): Promise<MoviePredicted[]> {

        const response = await this.axiosInstance.post<PredictionResponseDTO>('/ml', {
            mood: params.mood,
            primaryGenre: params.primaryGenre,
            secondaryGenre: params.secondaryGenre,
            epoch: parseInt(params.epoch)
        });

        const { data } = response;

        return data.data;
    }
}
