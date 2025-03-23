

export interface IExternalServices<T> {
    command(data: unknown): Promise<T>;
}
