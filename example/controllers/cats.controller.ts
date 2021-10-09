import { Controller, Get } from "destjs/decorators/index.ts";

@Controller("/cats")
class CatsController {
  @Get("/")
  getOne() {
    return { name: "Michael Scott", cute: true, crazy: true };
  }
}

export default CatsController;
