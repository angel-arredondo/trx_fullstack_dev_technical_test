import express, { Router } from 'express';
import cors from 'cors';
import helmet from "helmet";
import { CustomError } from '../utils/custom-error.util';

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

    private validateCors = (
        origin: string | undefined, 
        callback: (err: Error | null, origin?: boolean) => void
    ) => {
        const allowedOrigins = [
            'http://localhost:4173', 
            'http://localhost:5173'
        ];
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(CustomError.badRequest("Not allowed by CORS"));
    }
    async start() {
        this.app.use(helmet());
        this.app.use(cors({ origin: this.validateCors }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port} 🚀`);
        });
    }
}