import axios, { AxiosInstance } from 'axios';

export class AxiosClient {
    private static readonly instances: Map<string, AxiosInstance> = new Map();

    static getInstance(apiBaseUrl: string): AxiosInstance {
        if (!this.instances.has(apiBaseUrl)) {
            const token = process.env.TMDB_API_TOKEN;

            if (!token) {
                throw new Error("Token da API TMDB não fornecido. Defina a variável de ambiente TMDB_API_TOKEN.");
            }

            const instance = axios.create({
                baseURL: apiBaseUrl,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            this.instances.set(apiBaseUrl, instance);
        }

        return this.instances.get(apiBaseUrl);
    }
}
