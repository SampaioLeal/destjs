import { HttpContext, Interceptor } from "../types.ts";

export function UseInterceptor(interceptor: Interceptor) {
  return (
    // deno-lint-ignore no-explicit-any
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    // deno-lint-ignore ban-types
    const originalMethod = descriptor.value as Function;

    descriptor.value = async function (context: HttpContext) {
      await interceptor(context);
      return await originalMethod!.call(this, context);
    };
  };
}
