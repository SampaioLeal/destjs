import { HttpContext } from "destjs/types.ts";

export function DateInterceptor(context: HttpContext) {
  context.state.nowInterceptor = Date.now();
}
