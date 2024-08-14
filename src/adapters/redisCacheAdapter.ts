import { RedisClientType } from 'redis';
import { RedisClient } from '../infrastructure/redis/redisClient';
import { CacheAdapter } from '../interfaces/cacheAdapter';
import { MoviePredicted } from '../interfaces/dtos/mlApi-dto';

export class RedisCacheAdapter implements CacheAdapter<MoviePredicted[]> {
    private client: RedisClientType;

    constructor(redisUrl: string) {
        this.client = RedisClient.getInstance(redisUrl) as RedisClientType;
    }

    async get(key: string): Promise<MoviePredicted[] | null> {
        const value = await this.client.get(key);
        if (value) {
            return JSON.parse(value) as MoviePredicted[];
        }
        return null;
    }

    async set(key: string, value: MoviePredicted[]): Promise<void> {
        const serializedValue = JSON.stringify(value);
        await this.client.set(key, serializedValue);
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}


