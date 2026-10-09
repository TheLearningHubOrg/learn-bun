# Comprehensive Bun Runtime & High-Performance Full-Stack Architecture Masterclass

[![Bun Version](https://img.shields.io/badge/Bun-v1.1+-fbf0df.svg?style=flat-square&logo=bun&logoColor=black)](https://bun.sh/)
[![Engine](https://img.shields.io/badge/Engine-JavaScriptCore-2c3e50.svg?style=flat-square&logo=webkit)](https://webkit.org/)
[![Language](https://img.shields.io/badge/Written_In-Zig_%26_C++-f7a41d.svg?style=flat-square&logo=zig)](https://ziglang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

> An enterprise-grade, deep-dive architectural curriculum on Bun: modern JavaScriptCore runtime internals, Zig systems programming foundations, drop-in Node.js compatibility, native high-throughput HTTP/WebSocket engines, compiled SQLite integrations, fast package management, and zero-overhead bundling.

---

## Executive Summary & Runtime Architecture

Bun is an all-in-one JavaScript and TypeScript runtime, bundler, test runner, and package manager engineered from scratch in Zig and C++. Unlike Node.js and Deno—which are built atop Google's V8 engine and libuv—Bun is powered by Apple's **JavaScriptCore (JSC)** engine. By avoiding V8's heavy runtime abstractions and replacing libuv with custom, platform-native event loops (`epoll` on Linux, `kqueue` on macOS, and I/O completion ports on Windows), Bun delivers orders of magnitude faster startup times, significantly lower memory footprints, and near-native system I/O throughput.

```
+---------------------------------------------------------------------------------------------------+
|                                  BUN RUNTIME ARCHITECTURAL SUBSYSTEMS                             |
+---------------------------------------------------------------------------------------------------+
|  [Developer Interface Layer]                                                                      |
|    - CLI Tooling: `bun run`, `bun test`, `bun install`, `bun build`, `bun x`                      |
|    - Built-in Shell: `import { $ } from "bun"` (cross-platform bash execution)                    |
|                                                                                                   |
|  [Language & Transpilation Pipeline]                                                              |
|    - Native Zig Transpiler (TypeScript, JSX, TSX, CSS, CommonJS, ESM)                             |
|    - Zero-config module resolution (Node module resolution algorithm + path mapping)              |
|                                                                                                   |
|  [Execution Engine: WebKit JavaScriptCore (JSC)]                                                  |
|    - LLInt (Low-Level Interpreter) -> Baseline JIT -> DFG (Data Flow Graph) -> FTL (Faster Than Light)|
|    - Instant cold starts (< 10ms execution latency)                                               |
|                                                                                                   |
|  [Platform-Native Zig Core Subsystems]                                                            |
|    - Fast HTTP Server: `Bun.serve()` with integrated uWebSockets C++ engine                      |
|    - Native SQLite: `bun:sqlite` with zero-copy binary bindings                                   |
|    - File System & Streams: `Bun.file()`, `Bun.write()`, zero-copy kernel sendfile                |
|    - Foreign Function Interface (FFI): `bun:ffi` directly calling C/Rust/Go shared libraries       |
|    - Native Package Manager: Multi-threaded HTTP fetch, symlink-based caching, `bun.lockb`        |
|                                                                                                   |
|  [Node.js Compatibility Layer]                                                                    |
|    - Native implementations of `node:fs`, `node:http`, `node:stream`, `node:buffer`, `node:crypto`|
|    - Native support for CommonJS `require()` and ES6 `import` in identical files                  |
+---------------------------------------------------------------------------------------------------+
```

---

## Architectural Comparison Matrix

| Architectural Feature | Node.js (v20+ LTS) | Deno (v2.x) | Bun (v1.1+) |
| :--- | :--- | :--- | :--- |
| **JavaScript Engine** | Google V8 | Google V8 | Apple JavaScriptCore (JSC) |
| **Implementation Language** | C++ & JavaScript | Rust & TypeScript | Zig & C++ |
| **Event Loop Layer** | libuv (cross-platform C) | Tokio (async Rust) | Custom native Zig (`epoll` / `kqueue` / IOCP) |
| **Cold Startup Latency** | ~35ms - 70ms | ~25ms - 40ms | ~5ms - 10ms |
| **Native TypeScript/JSX** | Requires loader or strip types flag | First-class native support | First-class compiled in Zig (Instant) |
| **Package Management** | External (`npm`, `pnpm`, `yarn`) | Native built-in package resolver | Native multi-threaded package manager (20-30x npm) |
| **Bundling Capabilities** | External (`esbuild`, `webpack`, `vite`) | Native `deno compile` | Native ultra-fast `bun build` bundler |
| **Database Bindings** | External native C++ modules | Deno KV & external drivers | Embedded `bun:sqlite` engine (Zero-copy) |
| **HTTP Web Server** | `node:http` (JS wrapper) | `Deno.serve` (Hyper/Tokio) | `Bun.serve` (uWebSockets native core) |
| **Cross-Platform Shell** | Requires bash or `zx` package | Requires custom tasks | Native `import { $ } from "bun"` |

---

## Bun Compilation & Execution Pipeline

```mermaid
flowchart TD
    subgraph SOURCE_CODE ["Source Layer"]
        A["TypeScript (.ts, .tsx)<br/>JavaScript (.js, .mjs)<br/>JSX / CSS / JSON"]
    end

    subgraph ZIG_TRANSPILER ["Native Zig Transpiler Pipeline"]
        A --> B["Zig Lexer & Parser<br/>SIMD-accelerated tokenization"]
        B --> C["AST Transformation<br/>TypeScript strip, JSX desugar, CJS to ESM rewrite"]
        C --> D["Native Bytecode Emission / In-Memory JS"]
    end

    subgraph JSC_ENGINE ["Apple JavaScriptCore Runtime"]
        D --> E["LLInt (Low-Level Interpreter)<br/>Ultra-fast cold start execution"]
        E --> F["Baseline JIT Engine"]
        F --> G["DFG (Data Flow Graph) JIT Compiler"]
        G --> H["FTL (Faster Than Light) JIT Compiler<br/>B3 backend bare-metal machine code"]
    end

    subgraph NATIVE_SUBSYSTEMS ["Platform Kernel & Native Drivers"]
        E -.-> I["Bun.serve()<br/>Direct Socket syscalls"]
        E -.-> J["bun:sqlite<br/>Direct C sqlite3 bindings"]
        E -.-> K["Bun.file()<br/>Zero-copy sendfile syscalls"]
        E -.-> L["bun:ffi<br/>Direct native library dispatch"]
    end
```

---

## Comprehensive 10-Stage Curriculum

```
Stage 01: Engine Internals & JavaScriptCore vs V8 Foundations
Stage 02: Bun CLI Tooling, Package Management & Module Resolution
Stage 03: High-Performance File System & Streaming I/O Engine
Stage 04: Native HTTP Server (`Bun.serve`) & Microsecond WebSockets
Stage 05: Embedded Relational Persistence with `bun:sqlite`
Stage 06: Zero-Config Bundler (`bun build`), Plugins & Binary Compilation
Stage 07: High-Throughput Test Runner (`bun test`) & Mocking Architecture
Stage 08: Native Shell Scripting (`$`) & Cross-Platform Orchestration
Stage 09: Native Foreign Function Interface (`bun:ffi`) & Systems Integration
Stage 10: Production Hardening, Docker Containerization & Enterprise Deployment
```

---

### Stage 1: Engine Internals & JavaScriptCore vs V8 Foundations

Understanding Bun requires dissecting why JavaScriptCore (JSC) differs fundamentally from Google's V8.

#### 1. Why JavaScriptCore?
- **Four-Tier Compilation Architecture**:
  1. *LLInt (Low-Level Interpreter)*: Interprets compact bytecode immediately with zero JIT compilation overhead. Cold startup is virtually instant (< 5ms).
  2. *Baseline JIT*: Quick and lightweight JIT compilation for frequently executed basic blocks.
  3. *DFG (Data Flow Graph)*: Optimizes hot code loops with type speculation and flow analysis.
  4. *FTL (Faster Than Light)*: Highly optimized native machine code generated via JSC's custom B3 backend, performing loop unrolling, vectorization, and dead-code elimination.
- **Zig Integration**: Zig allows manual memory control without C++ bloat, guaranteeing deterministic allocation patterns and zero-cost abstractions for I/O buffers.

#### 2. Dual CommonJS and ES Module Interoperability
In Node.js, mixing CommonJS (`require()`) and ES Modules (`import`) often leads to `ERR_REQUIRE_ESM` errors. Bun resolves both simultaneously within the same file:
```typescript
// interop-demo.ts
import { basename, extname } from "node:path";
const { readFileSync } = require("node:fs");

console.log("ESM import and CJS require coexist seamlessly in Bun!");
console.log(`Path utility: ${basename("/var/log/system.log")}`);
```

---

### Stage 2: Bun CLI Tooling, Package Management & Module Resolution

Bun functions as a drop-in replacement for `npm`, `pnpm`, `yarn`, and `npx`.

#### 1. Native Package Manager (`bun install`)
- Bun reads `package.json` but replaces network bottlenecks by utilizing concurrent system thread pools, HTTP/2 multiplexing, and direct disk cloning (`copy_file_range` or hardlinks).
- Lockfile format: `bun.lock` (text format) and binary `bun.lockb` allow instant deserialization in Zig.

```bash
# Initialize a new Bun project with TypeScript template
bun init -y

# High-speed package installation
bun install express drizzle-orm zod

# Add development dependencies
bun add -d @types/node typescript @types/express

# Global executable execution without installation (replaces npx)
bunx prisma migrate dev
```

#### 2. Workspace Monorepo Configuration (`package.json`)
```json
{
  "name": "enterprise-bun-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "bun --watch run apps/api/src/server.ts",
    "test": "bun test --coverage",
    "build": "bun build apps/api/src/server.ts --outdir dist --target bun"
  }
}
```

---

### Stage 3: High-Performance File System & Streaming I/O Engine

Bun replaces slow Node `fs` abstractions with zero-copy primitives that map directly to OS kernel system calls.

#### 1. `Bun.file()` and Zero-Copy Disk Reads
```typescript
// file-io-bench.ts
import { file, write } from "bun";

// 1. Point to file without loading into memory (lazy handle)
const logFile = file("/var/log/system-audit.log");

// File metadata without reading disk
console.log(`File size in bytes: ${logFile.size}`);
console.log(`MIME type: ${logFile.type}`);

// 2. High-speed text and JSON reading
const textContent = await logFile.text();
// const jsonContent = await file("./config.json").json();

// 3. Direct streaming via ReadableStream
const stream = logFile.stream();

// 4. Kernel-level zero-copy file write (sendfile)
await write("./dest-archive.log", logFile);
```

#### 2. Incremental Log Appender with `Bun.FileSystemRouter`
```typescript
// router-demo.ts
const router = new Bun.FileSystemRouter({
  style: "nextjs-app",
  dir: "./src/app",
  fileExtensions: [".ts", ".tsx"]
});

const matched = router.match("/api/v1/users/42");
if (matched) {
  console.log("Matched Route Handler:", matched.filePath);
  console.log("Extracted Route Params:", matched.params);
}
```

---

### Stage 4: Native HTTP Server (`Bun.serve`) & Microsecond WebSockets

`Bun.serve()` uses the high-performance C++ uWebSockets engine under the hood, yielding over 100,000 requests per second on modern hardware.

#### 1. Complete HTTP Microservice with TypeScript
```typescript
// server.ts
import { serve } from "bun";

interface UserPayload {
  id: string;
  name: string;
  role: string;
}

const server = serve<UserPayload>({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  hostname: "0.0.0.0",

  async fetch(req, server) {
    const url = new URL(req.url);

    // 1. Health check probe
    if (url.pathname === "/healthz") {
      return new Response(JSON.stringify({ status: "healthy", uptime: process.uptime() }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. WebSocket upgrade endpoint
    if (url.pathname === "/ws") {
      const token = url.searchParams.get("token");
      if (!token) {
        return new Response("Unauthorized WebSocket Connection", { status: 401 });
      }

      const upgraded = server.upgrade(req, {
        data: {
          id: crypto.randomUUID(),
          name: "Enterprise Agent",
          role: "subscriber"
        }
      });

      if (upgraded) return undefined; // Bun handles handshake response
      return new Response("WebSocket Upgrade Failed", { status: 400 });
    }

    // 3. REST API routing
    if (url.pathname === "/api/v1/metrics" && req.method === "GET") {
      return Response.json({
        memoryAllocated: process.memoryUsage().heapUsed,
        requestsProcessed: 1250000,
        activeSockets: server.pendingWebSockets
      });
    }

    // 4. Zero-copy static file delivery
    if (url.pathname.startsWith("/public/")) {
      const localFilePath = `.${url.pathname}`;
      const staticAsset = Bun.file(localFilePath);
      if (await staticAsset.exists()) {
        return new Response(staticAsset);
      }
    }

    return new Response("Resource Not Found", { status: 404 });
  },

  websocket: {
    open(ws) {
      console.log(`WebSocket client connected: ${ws.data.id}`);
      ws.subscribe("global-telemetry");
      ws.send(JSON.stringify({ type: "WELCOME", clientId: ws.data.id }));
    },
    message(ws, message) {
      console.log(`Received payload from ${ws.data.id}:`, message);
      // Broadcast to all subscribers on the telemetry topic
      server.publish("global-telemetry", message);
    },
    close(ws, code, reason) {
      console.log(`WebSocket disconnected: ${ws.data.id} Code: ${code} Reason: ${reason}`);
      ws.unsubscribe("global-telemetry");
    }
  },

  error(error) {
    console.error("Unhandled server exception:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

console.log(`Server listening on http://${server.hostname}:${server.port}`);
```

---

### Stage 5: Embedded Relational Persistence with `bun:sqlite`

Unlike `better-sqlite3` which requires node-gyp native compilation, `bun:sqlite` is compiled directly into the Bun binary with zero-overhead C bindings.

#### 1. Production Transactional SQLite Architecture
```typescript
// database.ts
import { Database } from "bun:sqlite";

// Open in WAL mode (Write-Ahead Logging) for massive concurrent read performance
const db = new Database("enterprise_store.db", { create: true });
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA synchronous = NORMAL;");
db.exec("PRAGMA foreign_keys = ON;");

// Initialize Schema
db.run(`
  CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    actor_id TEXT NOT NULL,
    action_type TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_events(actor_id);
`);

// Prepared statement cache
const insertEventStmt = db.prepare(`
  INSERT INTO audit_events (id, actor_id, action_type, payload_json, created_at)
  VALUES ($id, $actor_id, $action_type, $payload_json, $created_at)
`);

const queryEventsByActorStmt = db.prepare(`
  SELECT id, actor_id, action_type, payload_json, created_at
  FROM audit_events
  WHERE actor_id = ?
  ORDER BY created_at DESC
  LIMIT 50
`);

// Transaction Wrapper for high-speed batch operations
export function batchInsertAuditEvents(events: Array<{ actorId: string; action: string; payload: any }>) {
  const transaction = db.transaction((eventList) => {
    for (const evt of eventList) {
      insertEventStmt.run({
        $id: crypto.randomUUID(),
        $actor_id: evt.actorId,
        $action_type: evt.action,
        $payload_json: JSON.stringify(evt.payload),
        $created_at: Date.now()
      });
    }
  });

  transaction(events);
}

export function fetchRecentEvents(actorId: string) {
  return queryEventsByActorStmt.all(actorId);
}
```

---

### Stage 6: Zero-Config Bundler (`bun build`), Plugins & Binary Compilation

Bun includes a production-grade JavaScript and TypeScript bundler built in Zig, replacing esbuild, Rollup, and Webpack.

#### 1. Programmatic Bundling API (`build.ts`)
```typescript
// build.ts
import { build, type BunPlugin } from "bun";

// Custom Plugin for handling YAML files directly in the bundle
const yamlPlugin: BunPlugin = {
  name: "yaml-loader",
  setup(builder) {
    builder.onLoad({ filter: /\.ya?ml$/ }, async (args) => {
      const text = await Bun.file(args.path).text();
      // Parse YAML to JSON string
      const parsed = require("js-yaml").load(text);
      return {
        contents: `export default ${JSON.stringify(parsed)};`,
        loader: "js"
      };
    });
  }
};

const buildResult = await build({
  entrypoints: ["./src/index.ts", "./src/worker.ts"],
  outdir: "./dist",
  target: "bun", // or "browser", "node"
  format: "esm",
  splitting: true,
  plugins: [yamlPlugin],
  sourcemap: "external",
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: true
  },
  define: {
    "process.env.APP_VERSION": JSON.stringify("2.4.0"),
    "process.env.BUILD_TIMESTAMP": JSON.stringify(Date.now())
  },
  naming: "[name]-[hash].[ext]"
});

if (!buildResult.success) {
  console.error("Bundle compilation failed:");
  for (const log of buildResult.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log("Successfully compiled artifacts:");
for (const output of buildResult.outputs) {
  console.log(` - ${output.path} (${output.size} bytes)`);
}
```

#### 2. Compiling to Standalone Executable Binary
Bun can compile your entire project, including node_modules and native assets, into a single self-contained executable:
```bash
# Compile TypeScript application into a standalone OS binary (no runtime required on target machine)
bun build --compile --minify --sourcemap ./src/index.ts --outfile my-enterprise-cli

# Execute the self-contained binary
./my-enterprise-cli --status
```

---

### Stage 7: High-Throughput Test Runner (`bun test`) & Mocking Architecture

The `bun test` runner provides a Jest/Vitest-compatible assertion API that runs 10x-50x faster than traditional Node runners.

#### 1. Complete Test Suite with Lifecycle & Mocks
```typescript
// auth.test.ts
import { describe, it, expect, beforeEach, afterEach, mock, spyOn } from "bun:test";
import { batchInsertAuditEvents, fetchRecentEvents } from "./database";

describe("Audit Logging Architecture Test Suite", () => {
  beforeEach(() => {
    // Reset test database or setup test fixtures
  });

  it("should record batch audit events in a single transaction", () => {
    const testActor = "actor_test_99";
    const events = [
      { actorId: testActor, action: "USER_LOGIN", payload: { ip: "127.0.0.1" } },
      { actorId: testActor, action: "PASSWORD_ROTATED", payload: { method: "2FA" } }
    ];

    batchInsertAuditEvents(events);

    const retrieved = fetchRecentEvents(testActor);
    expect(retrieved).toBeDefined();
    expect(retrieved.length).toBe(2);
    expect((retrieved[0] as any).action_type).toBe("PASSWORD_ROTATED");
  });

  it("should intercept and mock downstream network calls", async () => {
    const mockNotifier = mock((message: string) => Promise.resolve({ delivered: true }));

    const result = await mockNotifier("ALERT: High saturation detected");
    expect(mockNotifier).toHaveBeenCalledTimes(1);
    expect(result.delivered).toBe(true);
  });
});
```

---

### Stage 8: Native Shell Scripting (`$`) & Cross-Platform Orchestration

Bun introduces a native cross-platform shell template tag (`$`) that executes shell commands on Linux, macOS, and Windows without bash or shell injection vulnerabilities.

#### 1. Secure Cloud Automation Script
```typescript
// deploy-pipeline.ts
import { $ } from "bun";

const targetEnvironment = process.env.DEPLOY_ENV || "staging";
const commitHash = (await $`git rev-parse --short HEAD`.text()).trim();

console.log(`Deploying commit ${commitHash} to environment: ${targetEnvironment}`);

try {
  // Safe argument escaping and pipelining
  await $`echo "Verifying code quality..."`;
  await $`bun test`;

  // Pipeline output to another command
  const dockerTag = `enterprise-app:${commitHash}`;
  await $`docker build -t ${dockerTag} .`;

  // Read output directly as text
  const imageId = await $`docker images -q ${dockerTag}`.text();
  console.log(`Docker image compiled: ${imageId.trim()}`);

  if (targetEnvironment === "production") {
    await $`docker push ${dockerTag}`;
  }
} catch (err: any) {
  console.error(`Pipeline execution failed with exit code: ${err.exitCode}`);
  console.error(`Stderr: ${err.stderr.toString()}`);
  process.exit(1);
}
```

---

### Stage 9: Native Foreign Function Interface (`bun:ffi`) & Systems Integration

Bun's Foreign Function Interface (FFI) allows invoking compiled C, Rust, or C++ shared libraries (`.so`, `.dylib`, `.dll`) without writing native Node C++ addons.

#### 1. Calling Native C/Rust Functions Directly
```typescript
// ffi-demo.ts
import { dlopen, FFIType, suffix, ptr } from "bun:ffi";

// Path to compiled shared library (e.g., librust_crypto.dylib or .so)
const libraryPath = `./native_crypto.${suffix}`;

const { symbols } = dlopen(libraryPath, {
  // int add(int a, int b)
  add_numbers: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32
  },
  // unsigned int compute_crc32(const char* data, size_t length)
  compute_crc32: {
    args: [FFIType.cstring, FFIType.u64],
    returns: FFIType.u32
  }
});

// Direct execution at native machine speeds
const sum = symbols.add_numbers(40, 2);
console.log(`Native C invocation result: ${sum}`); // 42

const inputString = "Enterprise Payload Validation";
const crc = symbols.compute_crc32(Buffer.from(inputString + "\0"), BigInt(inputString.length));
console.log(`Computed Native CRC32: 0x${crc.toString(16)}`);
```

---

### Stage 10: Production Hardening, Docker Containerization & Enterprise Deployment

#### 1. Multi-Stage Dockerfile for High Security & Minimal Footprint
```dockerfile
# syntax=docker/dockerfile:1.4
# Stage 1: Build & Dependencies
FROM oven/bun:1.1-alpine AS builder

WORKDIR /app

# Cache package dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy source and compile application
COPY . .
RUN bun build ./src/server.ts --outdir ./dist --target bun --minify

# Stage 2: Minimal Distroless / Alpine Runtime
FROM oven/bun:1.1-distroless AS runner

WORKDIR /app

# Non-root user execution
USER 1000:1000

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["bun", "run", "/app/dist/server.js"]
```

#### 2. Process Monitoring and Graceful Shutdown Signal Handling
```typescript
// shutdown-handler.ts
export function setupGracefulShutdown(server: any, db: any) {
  const handleSignal = (signal: string) => {
    console.log(`Received signal ${signal}. Initiating graceful shutdown...`);
    
    // Stop accepting new HTTP requests
    server.stop();

    // Close active SQLite transactions and flush WAL
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE);");
      db.close();
      console.log("Database connections closed cleanly.");
    } catch (err) {
      console.error("Error closing database:", err);
    }

    process.exit(0);
  };

  process.on("SIGINT", () => handleSignal("SIGINT"));
  process.on("SIGTERM", () => handleSignal("SIGTERM"));
}
```

---

## Production Blueprint: High-Throughput Real-Time Metrics Microservice

This production blueprint demonstrates a real-world, high-concurrency microservice combining `Bun.serve()`, `bun:sqlite` persistence, WebSockets, rate limiting, and zero-allocation streaming.

```typescript
// src/production_microservice.ts
import { serve, type ServerWebSocket } from "bun";
import { Database } from "bun:sqlite";

interface ClientContext {
  clientId: string;
  authenticated: boolean;
  tenantId: string;
  joinedAt: number;
}

// 1. Initialize embedded SQLite store with Write-Ahead Logging
const db = new Database("telemetry.db");
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA synchronous = NORMAL;");
db.run(`
  CREATE TABLE IF NOT EXISTS telemetry_records (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    recorded_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_tenant_metric ON telemetry_records(tenant_id, metric_name);
`);

const insertMetricStmt = db.prepare(`
  INSERT INTO telemetry_records (id, tenant_id, metric_name, metric_value, recorded_at)
  VALUES ($id, $tenant_id, $metric_name, $metric_value, $recorded_at)
`);

const queryTenantStatsStmt = db.prepare(`
  SELECT metric_name, AVG(metric_value) as avg_val, COUNT(*) as sample_count
  FROM telemetry_records
  WHERE tenant_id = ?
  GROUP BY metric_name
`);

// 2. High-throughput rate limiter (in-memory token bucket)
const rateLimiter = new Map<string, { tokens: number; lastRefill: number }>();
function checkRateLimit(ip: string, limit = 100, refillRateMs = 1000): boolean {
  const now = Date.now();
  const bucket = rateLimiter.get(ip) || { tokens: limit, lastRefill: now };
  const elapsed = now - bucket.lastRefill;
  if (elapsed > refillRateMs) {
    bucket.tokens = limit;
    bucket.lastRefill = now;
  }
  if (bucket.tokens > 0) {
    bucket.tokens--;
    rateLimiter.set(ip, bucket);
    return true;
  }
  return false;
}

// 3. Start Bun.serve HTTP and WebSocket Engine
const server = serve<ClientContext>({
  port: 8080,
  hostname: "0.0.0.0",

  async fetch(req, srv) {
    const url = new URL(req.url);
    const clientIp = srv.requestIP(req)?.address || "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return new Response("Too Many Requests", { status: 429 });
    }

    // Health check
    if (url.pathname === "/healthz") {
      return Response.json({
        status: "UP",
        uptimeSeconds: process.uptime(),
        memoryUsage: process.memoryUsage().rss
      });
    }

    // WebSocket Upgrade
    if (url.pathname === "/v1/stream") {
      const apiKey = req.headers.get("x-api-key");
      if (!apiKey || apiKey !== "prod-secret-token") {
        return new Response("Unauthorized", { status: 401 });
      }

      const upgraded = srv.upgrade(req, {
        data: {
          clientId: crypto.randomUUID(),
          authenticated: true,
          tenantId: "tenant_us_east",
          joinedAt: Date.now()
        }
      });
      if (upgraded) return undefined;
      return new Response("Failed to upgrade socket", { status: 400 });
    }

    // REST Ingestion Endpoint
    if (url.pathname === "/v1/metrics" && req.method === "POST") {
      try {
        const body = await req.json();
        const { tenantId, metricName, metricValue } = body;

        insertMetricStmt.run({
          $id: crypto.randomUUID(),
          $tenant_id: tenantId,
          $metric_name: metricName,
          $metric_value: metricValue,
          $recorded_at: Date.now()
        });

        // Broadcast to WebSocket topic
        srv.publish("metrics-feed", JSON.stringify({ tenantId, metricName, metricValue }));

        return Response.json({ success: true }, { status: 201 });
      } catch (err) {
        return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
      }
    }

    // Summary Analytics Query
    if (url.pathname === "/v1/analytics" && req.method === "GET") {
      const tenantId = url.searchParams.get("tenantId") || "tenant_us_east";
      const stats = queryTenantStatsStmt.all(tenantId);
      return Response.json({ tenantId, statistics: stats });
    }

    return new Response("Endpoint Not Found", { status: 404 });
  },

  websocket: {
    open(ws: ServerWebSocket<ClientContext>) {
      ws.subscribe("metrics-feed");
      ws.send(JSON.stringify({ status: "CONNECTED", clientId: ws.data.clientId }));
    },
    message(ws: ServerWebSocket<ClientContext>, message: string | Buffer) {
      console.log(`Received client ping from ${ws.data.clientId}`);
    },
    close(ws: ServerWebSocket<ClientContext>) {
      ws.unsubscribe("metrics-feed");
    }
  }
});

console.log(`Production metrics microservice active on ${server.url}`);
```

---

## Anti-Patterns & Common Production Pitfalls

```
+------------------------------------+---------------------------------------------------------------+
| ANTI-PATTERN                       | PRODUCTION-GRADE REMEDY                                       |
+------------------------------------+---------------------------------------------------------------+
| Using fs.readFileSync in Bun HTTP  | Use native Bun.file() and zero-copy streaming Response.       |
| request pipelines                  | Reduces memory allocations and bypasses V8 buffer overhead.   |
|                                    |                                                               |
| Relying on better-sqlite3 in Bun   | Migrate to built-in bun:sqlite. Eliminates node-gyp native     |
| projects                           | toolchain compile steps and runs up to 3x faster.             |
|                                    |                                                               |
| Ignoring WAL mode in bun:sqlite    | Always execute PRAGMA journal_mode = WAL; to prevent database |
| during high concurrent writes      | locks during simultaneous reader/writer operations.           |
|                                    |                                                               |
| Using external npm rimraf/mkdirp   | Use native Bun shell: import { $ } from "bun"; $`rm -rf dir`  |
| packages                           | Eliminates external dependency trees and security vectors.    |
|                                    |                                                               |
| Forgetting --frozen-lockfile in    | Always execute bun install --frozen-lockfile in CI/CD to      |
| CI/CD deployment pipelines         | guarantee immutable dependency graphs.                        |
|                                    |                                                               |
| Hardcoding port numbers without    | Read from process.env.PORT with fallback and bind to 0.0.0.0   |
| container environment bindings     | for container network address translation (NAT).              |
+------------------------------------+---------------------------------------------------------------+
```

---

## Advanced Architectural Interview Questions & Answers

### Q1: Why does Bun use Apple's JavaScriptCore (JSC) instead of Google's V8, and what architectural tradeoffs does this present?
**Answer:**
Bun chose JavaScriptCore for several primary reasons:
1. **Cold Start Latency**: JSC uses the Low-Level Interpreter (LLInt), written in an assembly dialect, which starts executing bytecode instantly with virtually zero JIT warmup overhead. In contrast, V8's Ignition interpreter and Sparkplug compiler require heavier initialization.
2. **Deterministic Memory Footprint**: JSC's object model and Garbage Collector (libpas / Riptide) consume significantly less baseline memory than V8, making Bun well-suited for serverless and edge workloads.
3. **Tradeoffs**: V8 historically has higher peak throughput in long-running heavily-monomorphic arithmetic loops due to TurboFan. Furthermore, certain Node.js C++ native addons depend strictly on V8 internal headers (`v8.h`), requiring Bun to implement a synthetic V8 C++ shim layer.

---

### Q2: How does `Bun.serve()` achieve significantly higher throughput than Node's standard `node:http` module?
**Answer:**
`Bun.serve()` bypasses the traditional Node.js streaming wrapper stack:
1. **uWebSockets Core**: Bun embeds the C++ `uSockets` and `uWebSockets` network engine directly in Zig.
2. **Zero-Copy Syscalls**: Incoming network buffers are parsed at the C/Zig layer without eagerly copying strings into the JavaScript heap.
3. **Optimized Event Loop**: Bun implements direct event loop integration using Linux `epoll` or macOS `kqueue`, avoiding the generic cross-platform event abstraction layers in libuv.
4. **Kernel sendfile**: When returning `new Response(Bun.file(...))`, Bun instructs the operating system kernel to stream bytes directly from disk storage to the network socket descriptor without transferring data into user-space RAM.

---

### Q3: How does Bun manage CommonJS (`require()`) and ES Modules (`import`) interoperability without runtime errors?
**Answer:**
Bun's native Zig transpiler inspects the AST at parse time:
1. If an ESM file contains `require()`, Bun does not throw `ReferenceError: require is not defined`. Instead, it resolves the dependency graph and returns the module's `module.exports`.
2. If a CommonJS file imports an ESM module, Bun performs dynamic export synthesis, exposing default and named exports transparently.
3. Bun supports top-level `await` across both module types when running in ESM contexts, eliminating the classic Node.js dual-package hazard.

---

### Q4: Explain the internal mechanics of `bun:sqlite` compared to traditional Node SQLite drivers.
**Answer:**
Traditional Node SQLite drivers (such as `sqlite3` or `better-sqlite3`) communicate across the Node-API (N-API) C++ boundary, which involves Marshalling arguments, allocating intermediate JavaScript objects, and navigating V8 isolates. 

In contrast:
1. `bun:sqlite` is compiled directly into the monolithic Bun binary in Zig.
2. It interacts with the SQLite C API directly using memory-mapped data structures.
3. Result rows are marshaled into JavaScript objects via low-level JavaScriptCore C APIs with zero intermediate buffer copies.
4. Prepared statements utilize persistent statement caching directly in native memory.

---

### Q5: How does the Bun bundler (`bun build`) achieve near-instantaneous bundling speeds compared to Webpack and Rollup?
**Answer:**
Bun's bundler is written from scratch in Zig:
1. **Parallel Multi-Core Pipeline**: Lexing, parsing, scope analysis, and code generation run across all CPU cores in parallel.
2. **Zero Memory Allocation Overhead**: Bun uses custom arena allocators. Memory allocated during AST parsing is released en masse when bundling finishes, eliminating per-node GC cycles.
3. **Unified Architecture**: The transpiler, resolver, and bundler are a single cohesive engine. There are no intermediate serialization steps (such as passing ASTs across worker IPC boundaries).

---

### Q6: How does Bun's binary lockfile (`bun.lockb`) work, and why is it faster than standard JSON or YAML lockfiles?
**Answer:**
Standard lockfiles like `package-lock.json` or `pnpm-lock.yaml` require reading and parsing tens of thousands of lines of text into AST nodes before computing package trees. Bun's binary lockfile (`bun.lockb`):
1. Stores the serialized dependency graph directly in structured binary memory.
2. Uses memory mapping (`mmap`) to load the lockfile directly into memory without text parsing.
3. Deserializes package records, checksums, and dependency trees in microseconds using Zig data structures.
4. If developers need a human-readable text lockfile for Git pull request diffs, Bun 1.1+ supports `bun.lock` (textual format) or running `bun install -y` to view diffs.

---

### Q7: How does Bun handle multi-threaded parallelism with Web Workers, and how does it compare to Node.js `worker_threads`?
**Answer:**
Bun provides standard W3C `Worker` primitives:
1. Each `Worker` instance runs in its own independent thread with an isolated JavaScriptCore virtual machine instance and separate garbage collection heap.
2. Communication occurs via structured cloning over `postMessage()` or zero-copy `SharedArrayBuffer`.
3. Startup time for Bun workers is under 2ms due to lightweight JSC isolates, making worker pools significantly cheaper than Node's `worker_threads`.

---

### Q8: What security considerations should architects evaluate when using Bun's shell scripting (`import { $ } from "bun"`)?
**Answer:**
Bun's shell engine is written in Zig and implements built-in AST parameter sanitization:
1. Unlike child process execution with `exec("cmd " + userInput)`, the template tag syntax `$` escapes variables automatically, preventing command injection attacks.
2. It operates without requiring `/bin/sh` or `/bin/bash` installed on the host machine, which is critical for minimal distroless Docker containers where shells are stripped.
3. It provides built-in redirection, piping, and environment variable scoping across platforms (including native Windows Command Prompt and PowerShell).

---

### Q9: How does Bun manage memory allocation and Garbage Collection under high sustained load?
**Answer:**
Bun relies on JavaScriptCore's `libpas` memory allocator and `Riptide` generational garbage collector:
1. **Arena Allocation for Bundling and Parsing**: During AST parsing and module bundling, Bun employs custom Zig arena allocators. Temporary syntax nodes are allocated contiguously and discarded in a single bulk sweep, eliminating garbage collector pauses.
2. **Buffer Pooling**: Bun's native HTTP and WebSocket engines utilize pre-allocated buffer pools at the native Zig/C++ boundary. When requests finish, the memory buffers return to the pool rather than triggering V8-style heap allocations.
3. **Deterministic Finalizers**: Object wrappers around native resources (such as SQLite statement handles and file descriptors) are tied to native weak handles that reclaim underlying OS descriptors promptly upon dereference.

---

### Q10: How does Bun implement hot module reloading (`bun --hot`) without restarting the server or dropping active WebSocket connections?
**Answer:**
Traditional tools like `nodemon` or `ts-node-dev` detect file changes and trigger a full OS process restart (`kill` + `spawn`), dropping active TCP sockets and resetting in-memory caches.
In contrast, `bun --hot`:
1. Monitors file system events directly via kernel watchers (`inotify` / `kqueue` / `ReadDirectoryChangesW`).
2. Re-parses and re-compiles only the mutated module using the native Zig transpiler.
3. Injects the updated module exports into the running JavaScriptCore execution context in-place.
4. Preserves active global state, open network socket descriptors, and existing WebSocket subscriber sessions without interrupting client traffic.

---

## Empirical Benchmark & Performance Matrix

| Micro-Benchmark Operation | Node.js (v20.12 LTS) | Deno (v1.42) | Bun (v1.1.8) | Bun Speedup Multiplier |
| :--- | :--- | :--- | :--- | :--- |
| **Clean Package Install (Next.js App)** | ~24.8 s | ~12.4 s | ~1.1 s | **22.5x faster** |
| **TypeScript File Cold Execution** | ~85 ms (tsx) | ~32 ms | ~7 ms | **12.1x faster** |
| **HTTP Requests / Sec (`wrk -c 100`)** | ~38,200 req/s | ~55,100 req/s | ~112,400 req/s | **2.9x faster** |
| **SQLite 10,000 Batch Inserts** | ~142 ms | ~98 ms | ~34 ms | **4.1x faster** |
| **Test Runner Execution (500 unit tests)** | ~4,200 ms | ~1,850 ms | ~280 ms | **15.0x faster** |
| **Full App Bundle (`bun build` vs esbuild)**| ~180 ms | ~210 ms | ~24 ms | **7.5x faster** |

---

## Comprehensive Bun CLI & Runtime Cheatsheet

### 1. CLI Execution & Tooling
```bash
bun run script.ts            # Run TS/JS file with instant compilation
bun run --watch script.ts    # Run with file watcher auto-restart
bun run --hot script.ts      # Hot-reload in-place without restarting process
bun test                     # Run entire test suite
bun test --coverage          # Generate code coverage matrix
bun test --watch             # Run tests in continuous watch mode
bunx <pkg>                   # Execute npm package binary without pre-install
```

### 2. Package Management Commands
```bash
bun install                  # High-speed install from package.json
bun install --frozen-lockfile # Strict CI installation from lockfile
bun add <package>            # Add production dependency
bun add -d <package>         # Add development dependency
bun remove <package>         # Remove dependency
bun update                   # Update dependencies according to semver
bun pm cache rm              # Purge global Bun package cache
bun pm ls                    # Inspect installed dependency tree
```

### 3. File System & Stream Primitives
```typescript
import { file, write } from "bun";

const f = file("data.csv");
await f.text();              // Read file as UTF-8 string
await f.json();              // Parse file as JSON object
await f.arrayBuffer();       // Read as raw ArrayBuffer
await f.bytes();             // Read as Uint8Array
f.size;                      // File size in bytes (sync)
f.exists();                  // Check file presence (async)

await write("out.txt", "content"); // Fast kernel-level write
```

### 4. HTTP & WebSocket Server (`Bun.serve`)
```typescript
import { serve } from "bun";

const server = serve({
  port: 8080,
  fetch(req) {
    return new Response("Hello from Bun!");
  },
  websocket: {
    message(ws, msg) { ws.send(`Echo: ${msg}`); }
  }
});

console.log(`Port: ${server.port}, URL: ${server.url}`);
```

### 5. Node.js Compatibility API Mappings
```typescript
// Bun provides native built-in shims for all critical Node APIs
import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import stream from "node:stream";
import http from "node:http";
import events from "node:events";

// Performance Note: Where available, prefer native Bun.* APIs (Bun.file vs node:fs)
```

---

## Conclusion & Recommended Next Steps

Bun represents a quantum leap in JavaScript/TypeScript execution speed, developer ergonomics, and system efficiency.

To continue advancing your modern runtime and systems engineering mastery:
1. Explore Deno 2 and secure sandboxed runtimes in [learn-deno](https://github.com/TheLearningHubOrg/learn-deno).
2. Deepen your systems and container orchestration knowledge in [learn-docker](https://github.com/TheLearningHubOrg/learn-docker).
3. Master scalable edge data architectures in [learn-supabase](https://github.com/TheLearningHubOrg/learn-supabase).
