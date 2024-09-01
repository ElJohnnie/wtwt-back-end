import app from "./infrastructure/express/server";
import { MongoClient } from "./infrastructure/mongo/mongoClient";
import { Errors } from "./interfaces/enums/errors";

class Bootstrap {
    private cache;

    constructor() {
        this.cache = MongoClient;
    }

    async initialize(): Promise<void> {
        try {
            if(process.env.MONGO_URL && process.env.CACHE_COLLECTION_NAME) {
                console.log('entrou aqui')
                const db = await this.cache.connect();
                const collectionName = process.env.CACHE_COLLECTION_NAME;
                db.collection(collectionName);
            }

            app.listen(process.env.PORT || 3000, () => {
                console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
            });
        } catch (error) {
            console.log(Errors.Bootstrap, error)
            throw new Error(Errors.Bootstrap);
        }
    }
}

export default Bootstrap;
