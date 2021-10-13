import { HttpContext, Interceptor } from "../types.ts";
import { Reflect } from "../deps.ts";

export function UseInterceptor(interceptor: Interceptor) {
  return (
    // deno-lint-ignore no-explicit-any
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    // deno-lint-ignore ban-types
    const originalMethod = descriptor.value as Function;
    const endpoint = Reflect.getMetadata("endpoint", originalMethod);
    const httpMethod = Reflect.getMetadata("method", originalMethod);

    descriptor.value = async function (context: HttpContext) {
      await interceptor(context);
      return await originalMethod!.call(this, context);
    };

    Reflect.defineMetadata("endpoint", endpoint, descriptor.value);
    Reflect.defineMetadata("method", httpMethod, descriptor.value);

    return descriptor;
  };
}
