export interface Item {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}

export interface SystemMetrics {
  runtime: string;
  bunVersion: string;
  platform: string;
  arch: string;
  uptimeSeconds: number;
  memoryUsageMb: number;
  nanosecondsNow: string;
}

export interface WebSocketMessage {
  type: 'ping' | 'echo' | 'broadcast';
  payload: unknown;
  timestamp: string;
}
