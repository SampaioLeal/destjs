import { Context } from "./deps.ts";
import { Callback } from "./types.ts";

export function handleRoute(callback: Callback) {
  return async (context: Context) => {
    try {
      const response = await callback(context);
      context.response.body = response;
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
