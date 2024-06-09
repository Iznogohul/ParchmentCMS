import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getDevInstructions()).toBe(
        '<div>Welcome to Parchment CMS API.</div><p>To get started, please refer to the Swagger Documentation <a href="http://localhost:undefined/api-docs">here</a>.</p>',
      );
    });
  });
});
