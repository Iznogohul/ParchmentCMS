import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () =>
    request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect('<div>Welcome to Parchment CMS API.</div><p>To get started, please refer to the Swagger Documentation <a href="http://localhost:3000/api-docs">here</a>.</p>'));
});
