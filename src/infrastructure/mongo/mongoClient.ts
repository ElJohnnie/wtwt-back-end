import { MongoClient as NativeMongoClient, Db } from 'mongodb';
import { Errors } from '../../interfaces/enums/errors';

export class MongoClient {
    private static instances: Map<string, Db> = new Map();
    private static clients: Map<string, NativeMongoClient> = new Map();

    static async connect(): Promise<Db> {
        const mongoUrl = process.env.MONGO_URL!;
        const dbName = process.env.MONGO_DB_NAME!;
        const collectionName = process.env.CACHE_COLLECTION_NAME!;

        if (!this.instances.has(mongoUrl)) {
            const client = new NativeMongoClient(mongoUrl);

            try {
                await client.connect();
                const db = client.db(dbName);
                this.instances.set(mongoUrl, db);
                this.clients.set(mongoUrl, client);

                await this.ensureCollectionExists(db, collectionName);
            } catch (err) {
                console.error(Errors.MongoClient, err);
                throw new Error(Errors.MongoClient);
            }
        }

        return this.instances.get(mongoUrl)!;
    }

    private static async ensureCollectionExists(db: Db, collectionName: string) {
        const collections = await db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            await db.createCollection(collectionName);
        }
    }

    static async closeConnection(): Promise<void> {
        const mongoUrl = process.env.MONGO_URL!;
        const client = this.clients.get(mongoUrl);
        if (client) {
            await client.close();
            this.instances.delete(mongoUrl);
            this.clients.delete(mongoUrl);
        }
    }
}
