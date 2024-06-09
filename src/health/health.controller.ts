import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  HealthIndicatorResult,
  HealthCheckResult,
} from "@nestjs/terminus";

@ApiTags("hEaLtH")
@Controller("health")
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
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.http.pingCheck("uptime", "https://betterstack.com/better-uptime"),
      (): Promise<HealthIndicatorResult> => this.mongoDb.pingCheck("mongodb", { timeout: 5000 }),
      (): Promise<HealthIndicatorResult> => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024),
      (): Promise<HealthIndicatorResult> => this.memory.checkHeap("memory_heap", 300 * 1024 * 1024),
      (): Promise<HealthIndicatorResult> =>
        this.disk.checkStorage("storage", {
          path: "/",
          threshold: 128 * 1024 * 1024 * 1024,
        }),
    ]);
  }
}
