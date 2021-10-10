import { HttpContext, Interceptor, NextFunction } from "../types.ts";

export function handleInterceptor(interceptor: Interceptor) {
  return async (context: HttpContext, next: NextFunction) => {
    try {
      await interceptor(context);
      await next();
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "Internal server error!";

      context.response.body = {
        status,
        message,
      };
      context.response.status = status;
    }
  };
}
