import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

/**
 * Controller for handling application-level requests and providing information.
 */
@ApiTags("Information Desk")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Retrieves development instructions for using the API.
   *
   * @returns {string} Instructions for developers on how to access the Swagger documentation.
   */
  @Get()
  getDevInstructions(): string {
    return this.appService.devInstructions;
  }
}
