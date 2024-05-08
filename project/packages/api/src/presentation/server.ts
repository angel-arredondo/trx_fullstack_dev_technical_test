import express, { Router } from 'express';
import cors from 'cors';
import helmet from "helmet";
import { CustomError } from '../utils/custom-error.util';
import { envs } from '../adapters/env.adapter';

interface Options {
    port?: number | string;
    routes: Router;
}
export class Server {
    private readonly app = express();
    private readonly port: number | string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3001, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    private getOrigin = (
        origin: string | undefined, 
        callback: (err: Error | null, origin?: boolean) => void
    ) => {
        if (!origin) return callback(null, true)
        if (origin === envs.ALLOWED_ORIGIN) return callback(null, true);
        return callback(CustomError.badRequest("Not allowed by CORS"));
    }

    async start() {
        this.app.use(helmet());
        this.app.use(cors({ origin: this.getOrigin }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.info(`Server running on port: ${this.port} 🚀`);
        });
    }
}