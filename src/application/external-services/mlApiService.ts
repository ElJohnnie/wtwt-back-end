import { MovieApiService } from "../../interfaces/mlApiServiceInterface";
import { AxiosInstance } from 'axios';
import { PredictionResponse, MoviePredicted } from "../../interfaces/mlApiServiceInterface";
import { AxiosClient } from "../../infrastructure/axios/axiosClient";

export class MovieApiServiceImp implements MovieApiService<MoviePredicted[]> {
    private _axiosInstance: AxiosInstance;

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
