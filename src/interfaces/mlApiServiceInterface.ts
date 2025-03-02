

export interface MLApiService<T> {
    triggerML(movieData: unknown): Promise<T>;
}
