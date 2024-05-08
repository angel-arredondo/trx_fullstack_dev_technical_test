import mongoose from "mongoose";
import { CustomError } from "../../utils/custom-error.util";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options) {
        const { dbName, mongoUrl } = options;
        try {
            await mongoose.connect(mongoUrl, {
                dbName,
                retryWrites: true,
                writeConcern: { w: "majority" },
                appName:"databases"
            });
            return true;
        } catch(error) {
            console.error(error);
            throw CustomError.internalServer();
        }
    }
}