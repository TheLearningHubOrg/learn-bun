import type { Server, ServerWebSocket } from 'bun';
import { itemRepository } from './db/sqlite.js';
import type { SystemMetrics } from './types.js';

interface WebSocketData {
  createdAt: number;
  socketId: string;
}

export function createServer(port = 3000): Server {
  return Bun.serve<WebSocketData>({
    port,

    fetch(req, server) {
      const url = new URL(req.url);
      const start = Bun.nanoseconds();

      // 1. Upgrade WebSocket connections
      if (url.pathname === '/ws') {
        const upgraded = server.upgrade(req, {
          data: {
            createdAt: Date.now(),
            socketId: crypto.randomUUID()
          }
        });
        if (upgraded) return undefined;
        return new Response('WebSocket upgrade failed', { status: 400 });
      }

      // Helper for JSON responses with benchmark timing headers
      const jsonResponse = (data: unknown, status = 200) => {
        const durationNs = Bun.nanoseconds() - start;
        return new Response(JSON.stringify(data, null, 2), {
          status,
          headers: {
            'Content-Type': 'application/json',
            'X-Response-Time-Ns': durationNs.toString(),
            'X-Runtime': 'Bun'
          }
        });
      };

      // 2. Health & System Metrics Endpoint
      if (url.pathname === '/health' && req.method === 'GET') {
        const mem = process.memoryUsage();
        const metrics: SystemMetrics = {
          runtime: 'Bun',
          bunVersion: Bun.version,
          platform: process.platform,
          arch: process.arch,
          uptimeSeconds: Math.round(process.uptime()),
          memoryUsageMb: Math.round(mem.heapUsed / 1024 / 1024),
          nanosecondsNow: Bun.nanoseconds().toString()
        };
        return jsonResponse({ status: 'healthy', metrics });
      }

      // 3. Root Discovery
      if (url.pathname === '/' && req.method === 'GET') {
        return jsonResponse({
          name: 'Learn Bun High-Performance Masterclass API',
          version: '1.0.0',
          engine: 'JavaScriptCore',
          bunVersion: Bun.version,
          endpoints: {
            health: '/health',
            items: '/api/v1/items',
            websocket: '/ws'
          }
        });
      }

      // 4. REST API: GET /api/v1/items
      if (url.pathname === '/api/v1/items' && req.method === 'GET') {
        const items = itemRepository.findAll();
        return jsonResponse({ success: true, data: items, meta: { total: items.length } });
      }

      // 5. REST API: POST /api/v1/items
      if (url.pathname === '/api/v1/items' && req.method === 'POST') {
        return (async () => {
          try {
            const body = await req.json() as { title?: string; description?: string; status?: string };
            if (!body.title || typeof body.title !== 'string') {
              return jsonResponse({ success: false, error: 'Title is required' }, 400);
            }
            const item = itemRepository.create(body.title, body.description || '', body.status || 'pending');
            return jsonResponse({ success: true, data: item }, 201);
          } catch {
            return jsonResponse({ success: false, error: 'Malformed JSON payload' }, 400);
          }
        })();
      }

      // 6. REST API: DELETE /api/v1/items/:id
      if (url.pathname.startsWith('/api/v1/items/') && req.method === 'DELETE') {
        const id = parseInt(url.pathname.split('/').pop() || '', 10);
        if (isNaN(id)) {
          return jsonResponse({ success: false, error: 'Invalid ID parameter' }, 400);
        }
        const deleted = itemRepository.delete(id);
        if (!deleted) {
          return jsonResponse({ success: false, error: `Item with id ${id} not found` }, 404);
        }
        return jsonResponse({ success: true, data: { deletedId: id } });
      }

      // 404 Not Found
      return jsonResponse({ success: false, error: `Route not found: ${req.method} ${url.pathname}` }, 404);
    },

    websocket: {
      open(ws: ServerWebSocket<WebSocketData>) {
        ws.subscribe('general-broadcast');
        ws.send(JSON.stringify({
          type: 'connected',
          socketId: ws.data.socketId,
          message: 'Connected to Bun Native WebSocket Engine'
        }));
      },

      message(ws: ServerWebSocket<WebSocketData>, message: string | Buffer) {
        const str = typeof message === 'string' ? message : message.toString();
        try {
          const parsed = JSON.parse(str);
          if (parsed.type === 'broadcast') {
            ws.publish('general-broadcast', JSON.stringify({
              type: 'broadcast-message',
              from: ws.data.socketId,
              payload: parsed.payload,
              timestamp: new Date().toISOString()
            }));
          } else {
            ws.send(JSON.stringify({
              type: 'echo',
              payload: parsed,
              timestamp: new Date().toISOString()
            }));
          }
        } catch {
          ws.send(JSON.stringify({ type: 'error', message: 'Payload must be JSON' }));
        }
      },

      close(ws: ServerWebSocket<WebSocketData>) {
        ws.unsubscribe('general-broadcast');
      }
    }
  });
}
