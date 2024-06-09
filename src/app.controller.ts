import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Information Desk")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDevInstructions(): string {
    return this.appService.getDevInstructions();
  }
}
