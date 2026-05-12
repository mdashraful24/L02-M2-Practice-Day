import { createServer, ServerResponse, type IncomingMessage, type Server } from "http";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(req);
});

server.listen(5000, () => {
    console.log("The server is running on port 5000");
});
