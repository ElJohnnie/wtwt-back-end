export interface CacheAdapter<T> {
    get(key: string): Promise<T | null>;
    set(key: string, value: T): Promise<void>;
    del(key: string): Promise<void>;
}
