import { Callback, HttpContext } from "../types.ts";

export function handleRoute(callback: Callback) {
  return async (context: HttpContext) => {
    try {
      const response = await callback(context);
      context.response.body = response;
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "Internal server error!";

      context.response.body = {
        ...error,
        status,
        message,
      };
      context.response.status = status;
    }
  };
}
