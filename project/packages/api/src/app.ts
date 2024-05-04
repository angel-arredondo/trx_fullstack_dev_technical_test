import { Server } from "./presentation/server";
import { envs } from "./adapters/env.adapter";
import { AppRoutes } from "./presentation/V1/routes";
import { MongoDatabase } from "./data/mongodb/mongo.database";

const { MONGO_DB_NAME, MONGO_URL, PORT } = envs;

(()=>main())();

async function main() {
    await MongoDatabase.connect({
        dbName: MONGO_DB_NAME,
        mongoUrl: MONGO_URL,
    });
    
    await new Server({
        port: PORT,
        routes: AppRoutes.routes
    }).start();
}