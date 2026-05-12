import { createServer, ServerResponse, type IncomingMessage, type Server } from "http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
});

server.listen(config, () => {
    console.log(`The server is running on port ${config.port}`);
});
