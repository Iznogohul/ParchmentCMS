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

/**
 * Controller for health check endpoints.
 *
 * @class HealthController
 */
@ApiTags("hEaLtH")
@Controller("health")
export class HealthController {
  /**
   * Creates an instance of HealthController.
   *
   * @param {HealthCheckService} health - Service for health checks.
   * @param {HttpHealthIndicator} http - Indicator for HTTP health checks.
   * @param {MongooseHealthIndicator} mongoDb - Indicator for MongoDB health checks.
   * @param {MemoryHealthIndicator} memory - Indicator for memory health checks.
   * @param {DiskHealthIndicator} disk - Indicator for disk health checks.
   */
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoDb: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  /**
   * Performs health checks for various services including HTTP, MongoDB, memory, and disk.
   *
   * @returns {Promise<HealthCheckResult>} A promise that resolves to the health check result.
   * @method check
   */
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
