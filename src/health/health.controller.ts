import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoDb: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('uptime', 'https://betterstack.com/better-uptime'),
      () => this.mongoDb.pingCheck('mongodb', { timeout: 5000 }),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.disk.checkStorage('storage', {
        path: '/',
        threshold: 128 * 1024 * 1024 * 1024,
      }),
    ]);
  }
}
