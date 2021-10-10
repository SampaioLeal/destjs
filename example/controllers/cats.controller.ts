import { Controller, Get, UseInterceptor } from "destjs/decorators/index.ts";
import { HttpContext } from "../../types.ts";
import { DateInterceptor } from "../interceptors/date.interceptor.ts";

@Controller("/cats")
export default class CatsController {
  @UseInterceptor(DateInterceptor)
  @Get("/")
  getOne(context: HttpContext) {
    console.log(context.state);
    return { name: "Michael Scott", cute: true, crazy: true };
  }
}
