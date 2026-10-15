import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { createServer } from '../src/server.js';
import { itemRepository } from '../src/db/sqlite.js';

describe('Bun Server and SQLite Tests', () => {
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;

  beforeAll(() => {
    server = createServer(0); // 0 lets OS assign random open port
    baseUrl = `http://localhost:${server.port}`;
  });

  afterAll(() => {
    server.stop();
  });

  it('GET / should return Bun runtime metadata', async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.status).toBe(200);

    const body = await res.json() as { engine: string; version: string };
    expect(body.engine).toBe('JavaScriptCore');
    expect(body.version).toBe('1.0.0');
  });

  it('GET /health should return system metrics and fast response time header', async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    expect(res.headers.get('X-Runtime')).toBe('Bun');
    expect(res.headers.get('X-Response-Time-Ns')).toBeDefined();

    const body = await res.json() as { status: string; metrics: { runtime: string } };
    expect(body.status).toBe('healthy');
    expect(body.metrics.runtime).toBe('Bun');
  });

  it('GET /api/v1/items should retrieve seeded SQLite items', async () => {
    const res = await fetch(`${baseUrl}/api/v1/items`);
    expect(res.status).toBe(200);

    const body = await res.json() as { success: boolean; data: unknown[]; meta: { total: number } };
    expect(body.success).toBe(true);
    expect(body.meta.total).toBeGreaterThanOrEqual(2);
  });

  it('POST /api/v1/items should create and persist new item in SQLite', async () => {
    const payload = {
      title: 'Automated Bun Test Task',
      description: 'Testing native SQLite RETURNING clause',
      status: 'pending'
    };

    const res = await fetch(`${baseUrl}/api/v1/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    expect(res.status).toBe(201);
    const body = await res.json() as { success: boolean; data: { id: number; title: string } };
    expect(body.success).toBe(true);
    expect(body.data.title).toBe(payload.title);

    // Verify directly in database
    const inDb = itemRepository.findById(body.data.id);
    expect(inDb).not.toBeNull();
    expect(inDb?.title).toBe(payload.title);
  });

  it('DELETE /api/v1/items/:id should delete item from SQLite', async () => {
    const created = itemRepository.create('To delete', 'temp', 'pending');
    const res = await fetch(`${baseUrl}/api/v1/items/${created.id}`, { method: 'DELETE' });
    expect(res.status).toBe(200);

    const inDb = itemRepository.findById(created.id);
    expect(inDb).toBeNull();
  });
});
