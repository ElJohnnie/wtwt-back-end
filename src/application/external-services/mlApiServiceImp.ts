import { MLApiService } from "../../interfaces/mlApiServiceInterface";
import { AxiosInstance } from 'axios';
import { AxiosClient } from "../../infrastructure/axios/axiosClient";
import { MoviePredicted, PredictionResponse } from "../../interfaces/dtos/mlServiceDTO";

export class MovieApiServiceImp implements MLApiService<MoviePredicted[]> {
    private readonly _axiosInstance: AxiosInstance;

    constructor() {
        this._axiosInstance = AxiosClient.getInstance(process.env.ML_API_URL);
    }

    async triggerML(params): Promise<MoviePredicted[]> {

        const response = await this._axiosInstance.post<PredictionResponse>('/ml', {
            mood: params.mood,
            primaryGenre: params.primaryGenre,
            secondaryGenre: params.secondaryGenre,
            epoch: parseInt(params.epoch)
        });

        const { data } = response;

        return data.data;
    }
}
