import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/V1/routes";
import { MongoDatabase } from "./data/mongodb/mongo.database";

(()=>main())();

async function main() {
    await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: process.env.MONGO_URL!,
    });
    
    await new Server({
        port: process.env.PORT,
        routes: AppRoutes.routes
    }).start();
}