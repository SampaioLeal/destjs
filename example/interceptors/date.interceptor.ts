import { HTTPContext, NextFunction } from "../../types.ts";

export async function DateInterceptor(
  context: HTTPContext,
  next: NextFunction
) {
  context.state.nowInterceptor = Date.now();
  await next();
}
