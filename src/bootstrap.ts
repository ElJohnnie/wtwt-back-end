import app from "./infrastructure/express/server";
import { MongoClient } from "./infrastructure/mongo/mongoClient";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    const db = await MongoClient.connect();
    const collectionName = process.env.CACHE_COLLECTION_NAME!;
    this.collection = db.collection(collectionName);

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

export default bootstrap;
