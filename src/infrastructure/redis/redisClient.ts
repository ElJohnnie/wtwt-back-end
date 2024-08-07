import { createClient } from 'redis';

export class RedisClient {
    private static instances: Map<string, unknown> = new Map();

    static getInstance(redisUrl: string) {
        if (!this.instances.has(redisUrl)) {
            const client = createClient({
                url: redisUrl,
            });

            client.on('error', (err) => {
                console.error('Erro ao conectar ao Redis:', err);
            });

            this.instances.set(redisUrl, client);
        }

        return this.instances.get(redisUrl)!;
    }
}
