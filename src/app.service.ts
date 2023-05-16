import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `<div>Welcome to Parchment CMS API.</div><p>To get started, please refer to the Swagger Documentation <a href="http://localhost:${process.env.PORT}/api-docs">here</a>.</p>`;
  }
}
