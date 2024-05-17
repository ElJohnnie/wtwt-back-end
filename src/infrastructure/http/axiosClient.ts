import axios, { AxiosInstance } from 'axios';

export class AxiosClient {
    private static instance: AxiosInstance;

    static getInstance(): AxiosInstance {
        if (!AxiosClient.instance) {
            const token = process.env.TMDB_API_TOKEN; // Lendo o token da variável de ambiente

            if (!token) {
                throw new Error("Token da API TMDB não fornecido. Defina a variável de ambiente TMDB_API_TOKEN.");
            }

            AxiosClient.instance = axios.create({
                baseURL: 'https://api.themoviedb.org/3',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}` // Usando o token da variável de ambiente
                }
            });
        }

        return AxiosClient.instance;
    }
}
