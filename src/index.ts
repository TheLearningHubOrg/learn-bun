import { createServer } from './server.js';

const port = Number(process.env.PORT) || 3000;
const server = createServer(port);

console.log(`[learn-bun] Server listening at http://localhost:${server.port}`);
console.log(`[learn-bun] WebSocket gateway available at ws://localhost:${server.port}/ws`);
console.log(`[learn-bun] JavaScriptCore engine runtime: Bun v${Bun.version}`);
