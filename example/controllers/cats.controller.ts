import { Controller, Get, UseInterceptor } from "destjs/decorators/index.ts";
import { HTTPContext } from "../../types.ts";
import { DateInterceptor } from "../interceptors/date.interceptor.ts";

@Controller("/cats")
export class CatsController {
  @UseInterceptor(DateInterceptor)
  @Get("/")
  getOne(context: HTTPContext) {
    console.log(context.state);
    return { name: "Michael Scott", cute: true, crazy: true };
  }
}
