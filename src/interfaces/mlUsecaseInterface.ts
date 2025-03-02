export interface MLUsecaseInterface<T> {
    getRecommendedMovies(data: unknown): Promise<T>;
}
