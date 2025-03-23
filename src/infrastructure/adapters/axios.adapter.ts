import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRestClient } from '../../@shared/infrastructure/adapters/adapters.interface';

export class AxiosAdapter implements IRestClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
        return response.data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
        return response.data;
    }
}
