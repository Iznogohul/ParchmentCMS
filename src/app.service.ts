import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * @class AppService
 * Service responsible for application configuration and environment management.
 */
@Injectable()
export class AppService {
  /**
   * Creates an instance of AppService.
   *
   * @param {ConfigService} configService - The configuration service for managing environment variables.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Gets the port the application will run on.
   * If not specified in the environment variables, defaults to "3000".
   *
   * @returns {string} The port number as a string.
   * @throws {Warning} Logs a warning if the default port is used without specification in environment variables.
   */
  get port(): string {
    const port = this.configService.get<string>("PORT");
    const finalPort = port || "3000";

    if (finalPort === "3000" && !port) {
      console.warn(`No port specified in environment variables. Using default port ${finalPort}.`);
    }

    return finalPort;
  }

  /**
   * Checks if the application is running in development mode.
   *
   * @returns {boolean} True if the NODE_ENV is set to "development", false otherwise.
   */
  get isDev(): boolean {
    return this.configService.get<string>("NODE_ENV") === "development";
  }

  /**
   * Provides instructions for using the API based on the environment.
   * In development, it includes a link to the Swagger documentation.
   * In production, it returns a unique welcome message.
   *
   * @returns {string} A string containing instructions for developers in development mode,
   * or a welcome message for production mode.
   */
  get devInstructions(): string {
    if (this.isDev) {
      return `<div>Welcome to Parchment CMS API.</div><p>To get started, please refer to the Swagger Documentation <a href="http://localhost:${this.port}/api-docs">here</a>.</p>`;
    }
    return `Welcome to the production version of Parchment CMS API. Enjoy the seamless experience!`;
  }
}
