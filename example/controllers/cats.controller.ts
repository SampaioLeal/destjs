import { Controller, Get } from "destjs/decorators/index.ts";
import { HTTPContext } from "../../types.ts";

@Controller("/cats")
export class CatsController {
  @Get("/")
  getOne(context: HTTPContext) {
    const now = context.state.now;
    return { name: "Michael Scott", cute: true, crazy: true, now };
  }
}
