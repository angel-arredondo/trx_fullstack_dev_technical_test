import express, { Router } from 'express';


interface Options {
    port?: number | string;
    routes: Router;
}
export class Server {
    private readonly app = express();
    private readonly port: number | string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port = 3001, routes} = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port} 🚀`);
        });
    }
}