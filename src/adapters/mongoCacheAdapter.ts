import { Collection } from 'mongodb';
import { CacheAdapter } from '../interfaces/cacheAdapter';

export class MongoCacheAdapter<T> implements CacheAdapter<T> {
    private collection: Collection;

    async get(key: string): Promise<T | null> {
        const result = await this.collection.findOne({ key });
        if (result && result.value) {
            return JSON.parse(result.value) as T;
        }
        return null;
    }

    async set(key: string, value: T): Promise<void> {
        const serializedValue = JSON.stringify(value);
        await this.collection.updateOne(
            { key },
            { $set: { value: serializedValue } },
            { upsert: true }
        );
    }

    async del(key: string): Promise<void> {
        await this.collection.deleteOne({ key });
    }
}
