import { DestMiddleware, HTTPContext, NextFunction } from "destjs/types.ts";
import { Middleware } from "destjs/decorators/index.ts";

@Middleware()
export class DateMiddleware implements DestMiddleware {
  async use(context: HTTPContext, next: NextFunction) {
    context.state.nowMiddleware = Date.now();
    await next();
  }
}
